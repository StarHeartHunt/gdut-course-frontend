import CryptoJS from "crypto-js"

export const encrypt = (password: string, verifycode: string) => {
  var key = CryptoJS.enc.Utf8.parse(
    verifycode + verifycode + verifycode + verifycode
  )
  var srcs = CryptoJS.enc.Utf8.parse(password)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}
