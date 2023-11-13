const fetch = require('node-fetch');

const apiUrl = "https://inevm.caldera.dev/api/faucet";

function sendFaucetRequest(address) {
  const requestData = {
    address: address,
    network: "INEVM Devnet",
    token: "INJ"
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Respon dari API:", data);
    sendFaucetRequest(address); // Mengirim permintaan lagi setelah menerima respon
  })
  .catch(error => {
    console.error("Terjadi kesalahan:", error);
    sendFaucetRequest(address); // Mengirim permintaan lagi setelah kesalahan
  });
}

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Faucet Ethereum Devnet");
rl.question("Masukkan alamat yang ingin Anda kirim: ", (address) => {
  if (isValidEthereumAddress(address)) {
    sendFaucetRequest(address);
  } else {
    console.log("Alamat Ethereum tidak valid. Program akan berhenti.");
    rl.close();
  }
});

function isValidEthereumAddress(address) {
  // Anda dapat menambahkan validasi alamat Ethereum sesuai kebutuhan Anda di sini.
  // Contoh validasi sederhana: alamat harus memiliki panjang 42 karakter dan diawali dengan "0x".
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}
