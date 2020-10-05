<script lang="ts">
  import Compressor from "compressorjs";
  let files: any;
  let formData: any = new FormData();
  const serverURL = "http://localhost:5050/upload";
  
  const handlepic = (e: any, name: string): void => {
    const extension = e.target.files[0].type.split("/")[1];

    new Compressor(e.target.files[0], {
      quality: 0.4,
      success(resultCompressed) {
        formData.append("photo", resultCompressed, `${name}_${Date.now()}_.${extension}`);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const uploaPics = async (url: string): Promise<void> => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      console.log(JSON.stringify(response, null, 2));
      if (response.ok) {
        console.log("Uploaded successfully!");
        files = null;
        formData = new FormData();
        document.getElementById('picForm').reset();
      } else {
        console.log("Failed to upload!");
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<style>
  main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  form {
    margin-top: 2rem;
    height: 60vh;
    max-width: 480px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border: 1px solid #e4e4e4;
    border-radius: 7px;
    padding: 1.5rem 1rem;
    box-shadow: 1px 2px 10px 5px rgba(0, 0, 0, 0.08);
  }
  input {
    border-top: 1px solid #e4e4e4;
    padding-top: 5%;
    padding-bottom: 5%;
    cursor: pointer;
  }
  input:focus {
    outline: none;
  }
  label {
    margin: 0 auto;
    text-align: center;
  }
</style>

<main>
  <h1>Picture Upload</h1>
  <form enctype="multipart/form-data" id="picForm">
    <label><span>Front Picture</span>
      <input
        type="file"
        accept="image/*"
        required
        bind:files
        name="photo"
        on:change={(e) => handlepic(e, 'front')} />
    </label>
    <label><span>Back Picture</span>
      <input
        type="file"
        accept="image/*"
        required
        bind:files
        name="photo"
        on:change={(e) => handlepic(e, 'back')} />
    </label>
    <label><span>Side Picture</span>
      <input
        type="file"
        accept="image/*"
        required
        bind:files
        name="photo"
        on:change={(e) => handlepic(e, 'side')} />
    </label>
    <button on:click|preventDefault={() => uploaPics(serverURL)}>Upload</button>
  </form>
</main>
