// script.js

// Function to handle course selection submission
document.getElementById('course-selection-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const selectedCourses = []; // Array to store selected course IDs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked'); // Get checked checkboxes
    checkboxes.forEach(function(checkbox) {
        selectedCourses.push(checkbox.value); // Add selected course ID to array
    });

    // Send selected course IDs to server
    fetch('/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courses: selectedCourses })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Log server response
        // You can optionally display a success message to the user
    })
    .catch(error => {
        console.error('Error:', error);
        // Display an error message to the user
    });
});

// Function to fetch and display selected courses for the logged-in user
function displaySelectedCourses() {
    fetch('/courses')
    .then(response => response.json())
    .then(data => {
        const selectedCoursesList = document.getElementById('selected-courses-list');
        selectedCoursesList.innerHTML = ''; // Clear previous content
        data.forEach(course => {
            const listItem = document.createElement('li');
            listItem.textContent = course.course_name;
            selectedCoursesList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        // Display an error message to the user
    });
}

// Call the function to display selected courses when the page loads
window.onload = displaySelectedCourses;