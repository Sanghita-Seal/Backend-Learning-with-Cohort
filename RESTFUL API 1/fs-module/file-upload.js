/*In postman we can send headers, but how to send files(image or others)

We use multer for that

Multer is a  middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
// just like we used to give in fetch "contentType": "application/json" for sending json data, we need to give "content-type": "multipart/form-data" for sending files. But when we use multer it will automatically set the content-type to multipart/form-data and also it will handle the file upload process for us.

//Why do we even need multer? Because when we send files in a request, the data is sent in a different format than json or urlencoded data. The data is sent in a format called multipart/form-data which is not easy to parse and handle. Multer makes it easy to handle multipart/form-data and also provides various options for handling file uploads like file size limit, file type filter, etc.

multer -> file upload(image, video etc) -> req.body -> parse req.file, req.files -> store in disk or memory -> save file path in database

What is a file? -> collection = binary data -> disk
Typesof file ? Image(.jpg, .png, .jpeg), video(.mp4, .mkv), audio(.mp3, .wav), document(.pdf, .docx) etc

//fullform of MIME -> Multipurpose Internet Mail Extensions
//MIME type is a standard that indicates the nature and format of a document, file, or assortment of bytes. It is used to tell the browser what type of file is being sent so that it can handle it accordingly. For example, if the MIME type is image/jpeg, the browser will know that it is an image file and will display it accordingly. If the MIME type is application/pdf, the browser will know that it is a PDF file and will open it in a PDF viewer.

1. type = application/json, text/plain, application/xml, etc
2. subtype = json, plain, xml, etc

Can't we these without multer? Yes, we can handle file uploads without multer but it will be a bit complicated and we need to handle the parsing of multipart/form-data ourselves which is not an easy task. Multer makes it easy to handle file uploads and also provides various options for handling file uploads like file size limit, file type filter, etc.

To use multer, we need to install it first using npm or yarn

*/