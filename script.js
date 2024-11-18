document.getElementById('submission-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;
  const csrFileInput = document.getElementById('csrFile');
  const messageDiv = document.getElementById('message');

  // Check if file is selected
  if (!csrFileInput.files.length) {
      alert("Please attach a CSR file.");
      return;
  }

  const csrFile = csrFileInput.files[0];
  const csrContent = await csrFile.text(); // Read file content as text

  // Prepare payload
  const payload = {
      email: email,
      comment: comment,
      csrContent: csrContent
  };

  // POST to API Gateway
  try {
      const response = await fetch('https://your-api-gateway-endpoint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });

      if (response.ok) {
          // Clear form and show success message
          document.getElementById('submission-form').reset();
          messageDiv.textContent = "Submission successful!";
          messageDiv.classList.remove('hidden');
      } else {
          throw new Error('Failed to submit. Please try again.');
      }
  } catch (error) {
      alert(error.message);
  }
});
