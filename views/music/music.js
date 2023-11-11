<<<<<<< HEAD

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
=======
const firebaseConfig = {
    apiKey: "AIzaSyCZgZP878mOAM2ec-hz1WFwORxSw_J6d2k",
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
    authDomain: "soundbox-du-an-md31.firebaseapp.com",
    databaseURL: "https://soundbox-du-an-md31-default-rtdb.firebaseio.com",
    projectId: "soundbox-du-an-md31",
    storageBucket: "soundbox-du-an-md31.appspot.com",
    messagingSenderId: "265264289877",
    appId: "1:265264289877:web:0f88e2fa54c638685e9cdc",
    measurementId: "G-FE9Z9NKJDR"
};
firebase.initializeApp(firebaseConfig);
<<<<<<< HEAD
=======
const database = firebase.database();
const songsRef = database.ref("songs");
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d

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

<<<<<<< HEAD
        const database = firebase.database();
        const songsRef = database.ref("songs");

=======
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
        const newSong = {
            title: title,
            artist: artist,
            author: author,
            genre: genre,
            url: url,
<<<<<<< HEAD
            img : img,
=======
            image: img,
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
            copyrighted: copyrighted,
        };

        songsRef.push(newSong)
            .then(function () {
<<<<<<< HEAD
                console.log(img);
=======
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
                console.log("Bài hát đã được lưu vào Firebase Realtime Database.");
                $("#exampleModal").modal("hide");
            })
            .catch(function (error) {
                console.error("Lỗi khi lưu bài hát vào Firebase Realtime Database: " + error.message);
            });
    });
});

<<<<<<< HEAD

document.addEventListener("DOMContentLoaded", function () {
    const songsTable = document.getElementById("songsTable");
    const database = firebase.database();
    const songsRef = database.ref("songs");

    songsRef.on("value", (snapshot) => {
        songsTable.innerHTML = ""; 
        // Xóa nội dung hiện có trong bảng
=======
document.addEventListener("DOMContentLoaded", function () {
    const songsTable = document.getElementById("songsTable");

    songsRef.on("value", (snapshot) => {
        songsTable.innerHTML = "";
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d

        snapshot.forEach((childSnapshot) => {
            const songData = childSnapshot.val();

            // Tạo một dòng mới trong bảng
            const row = songsTable.insertRow();

            // Tạo các ô dữ liệu
            const titleCell = row.insertCell(0);
            titleCell.textContent = songData.title;

            const artistCell = row.insertCell(1);
            artistCell.textContent = songData.artist;

<<<<<<< HEAD
             const authorCell = row.insertCell(2);
            authorCell.textContent = songData.author;

             const countCell = row.insertCell(3);
            countCell.textContent = songData.count;

             const genreCell = row.insertCell(4);
            genreCell.textContent = songData.genre;

             const imageCell = row.insertCell(5);
            imageCell.textContent = songData.image;

            const urlCell = row.insertCell(6);
            urlCell.textContent = songData.url;

              const copyrightedCell = row.insertCell(7);
            copyrightedCell.textContent = songData.copyrighted;


            // Tạo ô chức năng (ví dụ: nút xóa và sửa)
            const actionCell = row.insertCell(8);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Xóa";
            deleteButton.classList.add("btn", "btn-info");
            deleteButton.addEventListener("click", () => {
                // Xử lý logic xóa bài hát ở đây
            });
            actionCell.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Sửa";
            editButton.classList.add("btn", "btn-info");
            editButton.addEventListener("click", () => {
                // Xử lý logic sửa bài hát ở đây
            });
            actionCell.appendChild(editButton);
        });
        
    });
});

const songsPerPage = 10; // Số bài hát trên mỗi trang
let currentPage = 1; // Trang hiện tại

// Lắng nghe sự kiện khi nút "Trang trước" được nhấn
document.getElementById("prevPage").addEventListener("click", function () {

    if (currentPage > 1) {
        currentPage--;
        displaySearchResults(originalSongsData); // Hiển thị lại danh sách với trang mới
    }
});

// Lắng nghe sự kiện khi nút "Trang sau" được nhấn
document.getElementById("nextPage").addEventListener("click", function () {
    const maxPage = Math.ceil(originalSongsData.length / songsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        displaySearchResults(originalSongsData); // Hiển thị lại danh sách với trang mới
    }
});

// Hàm hiển thị danh sách với phân trang
function displaySearchResults(data) {
const startIndex = (currentPage - 1) * songsPerPage;
const endIndex = startIndex + songsPerPage;
const songsToDisplay = data.slice(startIndex, endIndex);

const songsTable = document.getElementById("songsTable");
songsTable.innerHTML = "";

songsToDisplay.forEach((song) => {
// Tạo dòng và các ô dữ liệu cho mỗi bài hát
const row = songsTable.insertRow();

// Tạo ô dữ liệu cho trường hình ảnh (image)
const imageCell = row.insertCell(0);
const imageElement = document.createElement("img");
imageElement.src = song.image; // Sử dụng trường hình ảnh
imageElement.alt = song.title; // Tên bài hát là alt text
imageElement.style.maxWidth = "100px"; // Điều chỉnh kích thước hình ảnh nếu cần
imageCell.appendChild(imageElement);

// Tạo các ô dữ liệu cho các trường thông tin khác của bài hát
const titleCell = row.insertCell(1);
titleCell.textContent = song.title;

const artistCell = row.insertCell(2);
artistCell.textContent = song.artist;

const authorCell = row.insertCell(3);
authorCell.textContent = song.author;

const genreCell = row.insertCell(4);
genreCell.textContent = song.genre;

const urlCell = row.insertCell(5);
urlCell.innerHTML = `<a href="${song.url}" target="_blank">${song.title}</a>`;

const copyrightedCell = row.insertCell(6);
copyrightedCell.textContent = song.copyrighted ? "Có" : "Không";

const listensCell = row.insertCell(7);
listensCell.textContent = song.count; // Sử dụng trường lượt nghe

// Tạo ô chức năng (nút xóa và sửa)
const actionCell = row.insertCell(8);
=======
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
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
const deleteButton = document.createElement("button");
deleteButton.textContent = "Xóa";
deleteButton.classList.add("btn", "btn-danger");
deleteButton.addEventListener("click", () => {
<<<<<<< HEAD
    // Hiển thị modal xác nhận
    $("#confirmDeleteModal").modal("show");
    // Sử dụng biến `song.key` hoặc trường khóa chính của bài hát để xóa
    let songKeyToDelete = song.key;
    // Xử lý xóa nếu người dùng xác nhận
    document.getElementById("confirmDeleteButton").addEventListener("click", () => {
        songsRef.child(songKeyToDelete).remove();
        $("#confirmDeleteModal").modal("hide"); // Ẩn modal sau khi xóa xong
    });
});
actionCell.appendChild(deleteButton);

=======
songsRef.child(childSnapshot.key).remove();
});
actionCell.appendChild(deleteButton);

// Tạo nút sửa và thêm nó vào ô chức năng
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
const editButton = document.createElement("button");
editButton.textContent = "Sửa";
editButton.classList.add("btn", "btn-edit");
editButton.addEventListener("click", () => {
<<<<<<< HEAD
    $("#editModal").modal("show");
    document.getElementById("editSongKey").value = song.key;
    document.getElementById("editTitle").value = song.title;
    document.getElementById("editArtist").value = song.artist;
    document.getElementById("editAuthor").value = song.author;
    document.getElementById("editGenre").value = song.genre;
    document.getElementById("editUrl").value = song.url;
    document.getElementById("editImage").value = song.image; // Hiển thị hình ảnh trong modal sửa
    document.getElementById("editCopyrighted").checked = song.copyrighted;
    document.getElementById("editModal").classList.add("show");
    document.getElementById("editModal").style.display = "block";
});
actionCell.appendChild(editButton);
});
}

//Sap Xep
// Lắng nghe sự kiện sắp xếp theo tiêu đề
document.getElementById("sortByTitle").addEventListener("click", function () {
alert("aaaaaaaaaa")
const sortedSongs = originalSongsData.slice(); // Sao chép danh sách bài hát gốc
sortedSongs.sort((a, b) => a.title.localeCompare(b.title)); // Sắp xếp theo tiêu đề
displaySearchResults(sortedSongs);
});

// Lắng nghe sự kiện sắp xếp theo ca sĩ
document.getElementById("sortByArtist").addEventListener("click", function () {
const sortedSongs = originalSongsData.slice(); // Sao chép danh sách bài hát gốc
sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist)); // Sắp xếp theo ca sĩ
displaySearchResults(sortedSongs);
});
=======
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
>>>>>>> 476a9f7094a0c5796f38d8223e989b58fb99395d
