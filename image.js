const IMAGE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";

async function generateImage() {
  let input = document.getElementById("imageInput");
  let imageBox = document.getElementById("imageBox");
  if (input.value === "") return;

  imageBox.innerHTML = "<p><i>Generating image...</i></p>";

  try {
    const response = await fetch(IMAGE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input.value })
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    imageBox.innerHTML = `<img src="${url}" width="300"/>`;
  } catch (err) {
    imageBox.innerHTML = "<p>Error generating image. Try again.</p>";
  }
}
