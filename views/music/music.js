const firebaseConfig = {
    apiKey: "AIzaSyCZgZP878mOAM2ec-hz1WFwORxSw_J6d2k",
    authDomain: "soundbox-du-an-md31.firebaseapp.com",
    databaseURL: "https://soundbox-du-an-md31-default-rtdb.firebaseio.com",
    projectId: "soundbox-du-an-md31",
    storageBucket: "soundbox-du-an-md31.appspot.com",
    messagingSenderId: "265264289877",
    appId: "1:265264289877:web:0f88e2fa54c638685e9cdc",
    measurementId: "G-FE9Z9NKJDR"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const songsRef = database.ref("songs");

document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("save");

    saveButton.addEventListener("click", function () {
        const title = document.getElementById("exampletitle").value;
        const artist = document.getElementById("exampleartist").value;
        const author = document.getElementById("exampleauthor").value;
        const genre = document.getElementById("exampgenre").value;
        const url = document.getElementById("exampleurl").value;
        const img = document.getElementById("exampleimg").value;
        const copyrighted = document.getElementById("copyrighted").checked;

        const newSong = {
            title: title,
            artist: artist,
            author: author,
            genre: genre,
            url: url,
            image: img,
            copyrighted: copyrighted,
        };

        songsRef.push(newSong)
            .then(function () {
                console.log("Bài hát đã được lưu vào Firebase Realtime Database.");
                $("#exampleModal").modal("hide");
            })
            .catch(function (error) {
                console.error("Lỗi khi lưu bài hát vào Firebase Realtime Database: " + error.message);
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const songsTable = document.getElementById("songsTable");

    songsRef.on("value", (snapshot) => {
        songsTable.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            const songData = childSnapshot.val();

            // Tạo một dòng mới trong bảng
            const row = songsTable.insertRow();

            // Tạo các ô dữ liệu
            const titleCell = row.insertCell(0);
            titleCell.textContent = songData.title;

            const artistCell = row.insertCell(1);
            artistCell.textContent = songData.artist;

            const authorCell = row.insertCell(2);
            authorCell.textContent = songData.author;

            const genreCell = row.insertCell(3);
            genreCell.textContent = songData.genre;

          /*  const urlCell = row.insertCell(4);
            urlCell.textContent = songData.url; */

            const copyrightedCell = row.insertCell(4);
            copyrightedCell.textContent = songData.copyrighted;
             
            const imageCell = row.insertCell(5);
            imageCell.textContent = songData.image;

            // Tạo ô chức năng (nút xóa và sửa)
            const actionCell = row.insertCell(6);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Xóa";
            deleteButton.classList.add("btn", "btn-danger");
            deleteButton.addEventListener("click", () => {
               // Hiển thị modal xác nhận
                    $("#confirmDeleteModal").modal("show");
                    // Sử dụng biến `childSnapshot.key` để lưu key của bài hát cần xóa
                    let songKeyToDelete = childSnapshot.key;
                    // Xử lý xóa nếu người dùng xác nhận
                    document.getElementById("confirmDeleteButton").addEventListener("click", () => {
                        songsRef.child(songKeyToDelete).remove();
                        $("#confirmDeleteModal").modal("hide"); // Ẩn modal sau khi xóa xong
                    });
                });
            actionCell.appendChild(deleteButton);
            const editButton = document.createElement("button");
            editButton.textContent = "Sửa";
            editButton.classList.add("btn", "btn-edit");
            editButton.addEventListener("click", () => {
                  $("#editModal").modal("show");
                document.getElementById("editSongKey").value = childSnapshot.key;
                document.getElementById("editTitle").value = songData.title;
                document.getElementById("editArtist").value = songData.artist;
                document.getElementById("editAuthor").value = songData.author;
                document.getElementById("editGenre").value = songData.genre;
                document.getElementById("editUrl").value = songData.url;
                document.getElementById("editImage").value = songData.image;
                document.getElementById("editCopyrighted").checked = songData.copyrighted;
                document.getElementById("editModal").classList.add("show");
                document.getElementById("editModal").style.display = "block";

            });
            actionCell.appendChild(editButton);
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const saveEditButton = document.getElementById("saveEdit");
    saveEditButton.addEventListener("click", () => {
        const songKey = document.getElementById("editSongKey").value;
        const editedTitle = document.getElementById("editTitle").value;
        const editedArtist = document.getElementById("editArtist").value;
        const editedAuthor = document.getElementById("editAuthor").value;
        const editedGenre = document.getElementById("editGenre").value;
        const editedUrl = document.getElementById("editUrl").value;
        const editImage = document.getElementById("editImage").value;
        const editedCopyrighted = document.getElementById("editCopyrighted").checked;
        const editedSongRef = songsRef.child(songKey);
        editedSongRef.update({
            title: editedTitle,
            artist: editedArtist,
            author: editedAuthor,
            genre: editedGenre,
            url: editedUrl,
            image: editImage,
            copyrighted: editedCopyrighted,
        })
         $("#editModal").modal("hide");
});
});

// Thêm một biến `searchInput` để lưu trữ giá trị đầu vào của người dùng.
const searchInput = document.getElementById("searchInput");

// Tạo một hàm `searchSongs()` để thực hiện truy vấn database và trả về các bài hát phù hợp với từ khóa tìm kiếm.
function searchSongs(keyword) {
// Truy vấn database để tìm tất cả bài hát có tiêu đề bắt đầu bằng từ khóa đã cho.
const songsRef = firebase.database().ref("songs");
songsRef.orderByChild("title").startAt(keyword).endAt(keyword + "\uf8ff").on("value", (snapshot) => {
// Duyệt qua kết quả truy vấn và hiển thị từng bài hát trong bảng bài hát.
snapshot.forEach((childSnapshot) => {
// Lưu dữ liệu của bài hát hiện tại.
const songData = childSnapshot.val();

// Tạo một hàng mới trong bảng bài hát.
const row = songsTable.insertRow();

// Thêm dữ liệu bài hát vào hàng mới.
const titleCell = row.insertCell(0);
titleCell.textContent = songData.title;

const artistCell = row.insertCell(1);
artistCell.textContent = songData.artist;

const authorCell = row.insertCell(2);
authorCell.textContent = songData.author;

const genreCell = row.insertCell(3);
genreCell.textContent = songData.genre;

const urlCell = row.insertCell(4);
urlCell.textContent = songData.url;

const copyrightedCell = row.insertCell(5);
copyrightedCell.textContent = songData.copyrighted;

// Tạo ô chức năng (nút xóa và sửa)
const actionCell = row.insertCell(6);

// Tạo nút xóa và thêm nó vào ô chức năng
const deleteButton = document.createElement("button");
deleteButton.textContent = "Xóa";
deleteButton.classList.add("btn", "btn-danger");
deleteButton.addEventListener("click", () => {
songsRef.child(childSnapshot.key).remove();
});
actionCell.appendChild(deleteButton);

// Tạo nút sửa và thêm nó vào ô chức năng
const editButton = document.createElement("button");
editButton.textContent = "Sửa";
editButton.classList.add("btn", "btn-edit");
editButton.addEventListener("click", () => {
// Gán các giá trị từ dữ liệu vào form sửa bài hát
document.getElementById("editSongKey").value = childSnapshot.key;
document.getElementById("editTitle").value = songData.title;
document.getElementById("editArtist").value = songData.artist;
document.getElementById("editAuthor").value = songData.author;
document.getElementById("editGenre").value = songData.genre;
document.getElementById("editUrl").value = songData.url;
document.getElementById("editImage").value = songData.image;
document.getElementById("editCopyrighted").checked = songData.copyrighted;

// Hiển thị modal sửa bài hát
// $("#editModal").modal("show");
});
actionCell.appendChild(editButton);
});
});
}

// Sử dụng hàm `searchSongs()` để cập nhật nội dung của bảng bài hát.
searchSongs(searchInput.value.trim().toLowerCase());
