let container = $("#container");
let table = $("<table></table>");
table.addClass("jumbotron");


let hourTime = (moment().format('HH'));

let timeLog = [
    {plannerTime: "09:00 AM", milTime: "0900"},
    {plannerTime: "10:00 AM", milTime: "1000"},
    {plannerTime: "11:00 AM", milTime: "1100"},
    {plannerTime: "12:00 PM", milTime: "1200"},
    {plannerTime: "01:00 PM", milTime: "1300"},
    {plannerTime: "02:00 PM", milTime: "1400"},
    {plannerTime: "03:00 PM", milTime: "1500"},
    {plannerTime: "04:00 PM", milTime: "1600"},
    {plannerTime: "05:00 PM", milTime: "1700"},
];

//function used to determine local time, also generates HTML for the table
function dynamicTime() {
    for (let i=0; i<timeLog.length; i++) {
        let tableRow = $("<tr></tr>").attr("id", i);

        let timeBlock = $("<td></td>");
        timeBlock.addClass("hour");
        timeBlock.text(timeLog[i].plannerTime);

        let description = $("<td></td>");

        description.addClass("col-md-12");

        let textarea = $("<textarea></textarea>").attr("id", `t-${i}`);
        textarea.addClass("textarea form-control");

        if (timeLog[i].milTime === hourTime) {
            textarea.addClass("present")
        }
        else if (timeLog[i].milTime < hourTime) {
            textarea.addClass("past")
        }
        else if (timeLog[i].milTime > hourTime) {
            textarea.addClass("future")
        };

        textarea.val(localStorage.getItem(`t-${i}`));
        description.append(textarea);

        let saveButton = $("<td></td>");

        let button = document.createElement('button');
        button.classList.add("saveBtn");
        saveButton.append(button);

        button.onclick = () => {
            localStorage.setItem(`t-${i}`, $(`#t-${i}`).val())
            console.log($(`#t-${i}`).val());
        }
        //appending all td elements to each row of the table
        tableRow.append(timeBlock, description, saveButton);

        table.append(tableRow);
    }

    container.append(table);
};

dynamicTime();

