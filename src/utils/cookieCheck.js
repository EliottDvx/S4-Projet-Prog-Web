export const cookieValueOrNull = (cookieName) => {
    return (document.cookie.match(new RegExp("^(?:.*;)?\\s*" + cookieName + "\\s*=\\s*([^;]+)(?:.*)?$"))||[,null])[1]
  }
  