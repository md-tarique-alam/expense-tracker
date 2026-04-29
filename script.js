let date = document.getElementById("date");
let title = document.getElementById("title");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let page = document.getElementById("page");
let list = document.getElementById("list");
let errmsg = document.getElementById("errmsg");
let totalEl = document.getElementById("total");

let expenses = [];

page.addEventListener("submit", function (e) {
    e.preventDefault();

    const titleValue = title.value.trim();
    const amountValue = amount.value;

    if (!titleValue || !amountValue) {
        errmsg.textContent = "Fill the blank field";
        return;
    }

    errmsg.textContent = "";

    let obj = {
        id: Date.now(),
        date: date.value,
        title: titleValue,
        amount: amountValue,
        category: category.value
    };

    expenses.push(obj);

    title.value = "";
    amount.value = "";
    date.value = "";

    saveExpenses();
    renderExpenses();
});

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
    list.innerHTML = "";

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.textContent = `Date: ${expense.date} | Title: ${expense.title} | Amount: ₹${expense.amount}`;

        let dltbtn = document.createElement("button");
        dltbtn.textContent = "Delete";

        dltbtn.addEventListener("click", function () {
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        });

        li.appendChild(dltbtn);
        list.appendChild(li);
    });

    let total = expenses.reduce(function (acc, expense) {
        return acc + Number(expense.amount);
    }, 0);

    totalEl.textContent = "Total: ₹ " + total;
}

function loadExpenses() {
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];
}

loadExpenses();
renderExpenses();