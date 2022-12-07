const setUrl = ({ name, phone, email }) => {
  const nameValues = name.split(" ");

  const [user, domain] = email.split("@");

  const baseUrl = `https://quickchart.io/qr?text=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3A${nameValues[0]}%3B${nameValues[1]}%0ATEL%3BWORK%3BVOICE%3A${phone}%0ATEL%3BCELL%3AMobile%0ATEL%3BCELL%3AMobile%0ATEL%3BCELL%3AMobile%0ATEL%3BFAX%3A%0AEMAIL%3BWORK%3BINTERNET%3A${user}%40${domain}%0AEND%3AVCARD`;

  return baseUrl;
};

document.addEventListener("DOMContentLoaded", () => {
  const nameField = document.getElementById("name");
  const roleField = document.getElementById("role");
  const workField = document.getElementById("work");
  const phoneField = document.getElementById("phone");
  const addrField = document.getElementById("address");
  const emailField = document.getElementById("email").children[1];
  const imgQR = document.getElementById("qrcode");
  const loading = document.getElementsByClassName("transform")[0];
  const options = Array.from(
    document.getElementsByClassName("options")[0].children
  );

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (imgQR.src !== "") {
        document.removeEventListener("keypress", onKeyPress);
      }
      nameField.contentEditable = false;
      roleField.contentEditable = false;
      workField.contentEditable = false;
      emailField.contentEditable = false;
      phoneField.contentEditable = false;
      addrField.contentEditable = false;
      const source = setUrl({
        name: nameField.textContent,
        phone: phoneField.textContent,
        email: emailField.textContent,
      });
      loading.style.display = "";
      setTimeout(() => {
        imgQR.src = source;
        imgQR.alt = "QRCODE";
        imgQR.style.display = "";
        imgQR.style.paddingLeft = "43vw";
        loading.style.display = "none";
      }, 2550);
    }
  };
  document.addEventListener("keypress", onKeyPress);

  const setBackground = (e) => {
    const { value } = e.target;
    const content = document.getElementById("content");
    content.style.backgroundImage = `url(imgs/${value}.png)`;
  };

  options.forEach((div) => {
    const input = div.firstElementChild;
    input.addEventListener("change", (e) => setBackground(e));
  });
});
