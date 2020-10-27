const attachmentService = require('business/services/attachmentService');

const process = async (req, res, next) => {
    const attachments = JSON.parse(req.body.attachments);
    const removedAttachments = JSON.parse(req.body.removedAttachments);
    if(req.files && req.files.length) {
        const attachmentSaves = [];
        const uploadedFiles = req.files.map(upload => { 
        return {
            storageKey: upload.key,
            fileKey: upload.originalname,
            mimeType: upload.mimeType,
            url: upload.location,
            isEmailLogo: req.isEmailLogo,
            user: req.user,
            public: false
        } });
        uploadedFiles.forEach(uploadFile => {
            const match = attachments.find(attachment => attachment && (attachment.key === uploadFile.fileKey));
            if(match) {
                uploadFile.fileName = match.fileName;
                uploadFile.type = match.type;
            }
            attachmentSaves.push(attachmentService.create(uploadFile))
        });
        req.attachments = await Promise.all(attachmentSaves);
    }
    if(removedAttachments && removedAttachments.length) {
        const removePromises = [];
        removedAttachments.forEach(attachment => {
            if(attachment && attachment._id) {
                removePromises.push(attachmentService.remove(attachment._id))
            }
        });
        const removeResults = await Promise.all(removePromises);
    }
    next();
}

module.exports = {
    process
}