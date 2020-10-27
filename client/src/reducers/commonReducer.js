export default function reducer(state = {
    showToast: false,
    toast: {
        toastData: null,
    },
    error: null
  }, action) {
    switch (action.type) {
      case 'SHOW_TOAST': {    
        return {
          ...state,
          toast: {
            showToast: true,
            toastData: action.payload
          }
        }
      }
      default: {
        return { ...state }
      }
    }
  }