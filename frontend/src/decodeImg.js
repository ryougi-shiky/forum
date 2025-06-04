// This function is used to decode base64 image(binary form) 
// into a normal image format that can be displayed

// Do not forget to write as `data:image/jpeg;base64,${decodeImg(user.profilePicture.data)}`
export const decodeImg = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}