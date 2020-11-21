const SubtractFromCart = (btn) => {
    const pastryId = btn.parentNode.querySelector('[name=pastryId]').value;
    const eventId = btn.parentNode.querySelector('[name=eventId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    fetch(`/user/sub-from-event/${eventId}?pastryId=${pastryId}`, {
        method: 'POST',
        headers: {
            'csrf-token': csrf
        }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));

}

const AddToCart = (btn) => {
    const pastryId = btn.parentNode.querySelector('[name=pastryId]').value;
    const eventId = btn.parentNode.querySelector('[name=eventId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    fetch(`/user/add-to-event/${eventId}?pastryId=${pastryId}`, {
        method: 'POST',
        headers: {
            'csrf-token': csrf
        }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));

}