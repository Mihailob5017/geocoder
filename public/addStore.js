const storeForm = document.querySelector('#store-form');
const storeId = document.querySelector('#store-id');
const storeAddress = document.querySelector('#store-address');

storeForm, addEventListener('submit', addStore);

//Send POST TO API to add store
async function addStore(e) {
  e.preventDefault();
  if (storeId.value === '' || storeAddress.value === '') {
    alert('Please fill in fields');
  }
  const sendBody = {
    storeID: storeId.value,
    address: storeAddress.value
  };

  try {
    const res = await fetch('http://localhost:5000/api/v1/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) {
      throw Error('Store Alraedy Exists');
    }
    alert('Store Added');
    window.location.href = '/index.html';
  } catch (error) {
    alert(error);
  }
}
