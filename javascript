const tableContainer = document.getElementById('table-container');
let students = [];

// Fetch data from the provided URL
fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        students = data;
        renderTable(students);
    })
    .catch(error => console.error('Error fetching data:', error));

// Render the table with student data
function renderTable(data) {
    let tableHtml = `<table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Class</th>
                                <th>Marks</th>
                                <th>Passing</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    data.forEach(student => {
        tableHtml += `<tr>
                        <td><img src="${student.img_src}" alt="Profile Image"> ${student.first_name} ${student.last_name}</td>
                        <td>${student.email}</td>
                        <td>${student.class}</td>
                        <td>${student.marks}</td>
                        <td>${student.passing ? 'Passing' : 'Failed'}</td>
                        <td>${student.gender}</td>
                    </tr>`;
    });

    tableHtml += `</tbody></table>`;
    tableContainer.innerHTML = tableHtml;
}

// Filter the table based on search input
function filterTable() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.first_name.toLowerCase().includes(query) ||
        student.last_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    renderTable(filteredStudents);
}

// Sort the table based on the criteria
function sortTable(criteria) {
    let sortedStudents;
    if (criteria === 'az') {
        sortedStudents = [...students].sort((a, b) => (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name));
    } else if (criteria === 'za') {
        sortedStudents = [...students].sort((a, b) => (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name));
    } else if (criteria === 'marks') {
        sortedStudents = [...students].sort((a, b) => a.marks - b.marks);
    } else if (criteria === 'passing') {
        sortedStudents = students.filter(student => student.passing);
    } else if (criteria === 'class') {
        sortedStudents = [...students].sort((a, b) => a.class - b.class);
    } else if (criteria === 'gender') {
        const femaleStudents = students.filter(student => student.gender === 'female');
        const maleStudents = students.filter(student => student.gender === 'male');
        renderTable(femaleStudents);
        const maleTableHtml = tableContainer.innerHTML;
        renderTable(maleStudents);
        tableContainer.innerHTML = tableContainer.innerHTML + '<br>' + maleTableHtml;
        return;
    }
    renderTable(sortedStudents);
}
