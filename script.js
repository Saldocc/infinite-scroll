const imageContainer = document.querySelector(`#image-container`);
const loader = document.querySelector(`#loader`);

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//API Information
let count = 5;
let apiKey = "7_HBeFrqXlQCbvhN6kAu3BfeumJPLw5NQrNLBDBYig8";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//control function for all images loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 10;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

// Helper SetAttribute function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Helper Number Formatter Function
function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

// create a and img elements and display in image container
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //user Real Name
    const userName = document.createElement("a");
    setAttributes(userName, {
      href: photo.user.links.html,
      target: "_blank",
    });
    userName.innerText = photo.user.name;

    //user Username
    const userUsername = document.createElement("a");
    setAttributes(userUsername, {
      href: photo.user.links.html,
      target: "_blank",
    });
    userUsername.innerText = "@" + photo.user.username;

    //create text info div
    const userInfoText = document.createElement("div");
    userInfoText.className = "user-information-text";

    userInfoText.appendChild(userName);
    userInfoText.appendChild(userUsername);

    //user image link
    const userImageLink = document.createElement("a");
    setAttributes(userImageLink, {
      href: photo.user.links.html,
      target: "_blank",
    });

    //user image
    const userImage = document.createElement("img");
    setAttributes(userImage, {
      src: photo.user.profile_image.medium,
      alt: photo.user.name,
      title: photo.user.name,
    });
    userImage.className = "user-information-image";

    userImageLink.appendChild(userImage);

    //user information
    const userInfo = document.createElement("div");
    userInfo.className = "user-information";

    userInfo.appendChild(userImageLink);
    userInfo.appendChild(userInfoText);

    //photo information favorite
    const photoInfoFav = document.createElement("a");
    setAttributes(photoInfoFav, {
      href: photo.links.html,
      target: "_blank",
    });
    photoInfoFav.innerText = numFormatter(photo.likes);

    //favorite icon
    const iconFav = document.createElement("i");
    iconFav.className = "fas fa-heart";

    photoInfoFav.appendChild(iconFav);

    //photo information download
    const photoInfoDownload = document.createElement("a");
    setAttributes(photoInfoDownload, {
      href: photo.links.download,
      target: "_blank",
    });
    photoInfoDownload.innerText = numFormatter(photo.downloads);

    //download icon
    const iconDownload = document.createElement("i");
    iconDownload.className = "fas fa-download";

    photoInfoDownload.appendChild(iconDownload);

    //photo information view
    const photoInfoView = document.createElement("a");
    setAttributes(photoInfoView, {
      href: photo.links.html,
      target: "_blank",
    });
    photoInfoView.innerText = numFormatter(photo.views);

    //view icon
    const iconView = document.createElement("i");
    iconView.className = "fas fa-eye";

    photoInfoView.appendChild(iconView);

    const photoInfo = document.createElement("div");
    photoInfo.className = "photo-information";

    photoInfo.appendChild(photoInfoFav);
    photoInfo.appendChild(photoInfoDownload);
    photoInfo.appendChild(photoInfoView);

    const hoverInfo = document.createElement("div");
    hoverInfo.className = "hover-information";

    hoverInfo.appendChild(userInfo);
    hoverInfo.appendChild(photoInfo);

    //main photo
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.className = "main-image";

    item.appendChild(img);

    img.addEventListener("load", imageLoaded);

    const İmageItem = document.createElement("div");
    İmageItem.className = "image-item";

    İmageItem.appendChild(item);
    İmageItem.appendChild(hoverInfo);

    imageContainer.appendChild(İmageItem);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("Error:", error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
