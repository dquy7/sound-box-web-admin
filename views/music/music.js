
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "soundbox-du-an-md31.firebaseapp.com",
    databaseURL: "https://soundbox-du-an-md31-default-rtdb.firebaseio.com",
    projectId: "soundbox-du-an-md31",
    storageBucket: "soundbox-du-an-md31.appspot.com",
    messagingSenderId: "265264289877",
    appId: "1:265264289877:web:0f88e2fa54c638685e9cdc",
    measurementId: "G-FE9Z9NKJDR"
};
firebase.initializeApp(firebaseConfig);

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

        const database = firebase.database();
        const songsRef = database.ref("songs");

        const newSong = {
            title: title,
            artist: artist,
            author: author,
            genre: genre,
            url: url,
            img : img,
            copyrighted: copyrighted,
        };

        songsRef.push(newSong)
            .then(function () {
                console.log(img);
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
    const database = firebase.database();
    const songsRef = database.ref("songs");

    songsRef.on("value", (snapshot) => {
        songsTable.innerHTML = ""; 
        // Xóa nội dung hiện có trong bảng

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
const deleteButton = document.createElement("button");
deleteButton.textContent = "Xóa";
deleteButton.classList.add("btn", "btn-danger");
deleteButton.addEventListener("click", () => {
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

const editButton = document.createElement("button");
editButton.textContent = "Sửa";
editButton.classList.add("btn", "btn-edit");
editButton.addEventListener("click", () => {
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
