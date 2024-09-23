const socket = io();

document.getElementById('joinBtn').addEventListener('click', () => {
    const roomId = document.getElementById('roomId').value;
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;

    socket.emit('joinClass', { roomId, role, name });
});

socket.on('updateClass', (classroom) => {
    document.getElementById('classroomState').textContent = JSON.stringify(classroom, null, 2);
});

socket.on('permissionDenied', (message) => {
    alert(message);
});
