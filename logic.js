const form = document.getElementById('txn-form');
const tableBody = document.getElementById('txn-table');
let txn = JSON.parse(localStorage.getItem('txn')) || [];

function displayTable(data){
    tableBody.innerHTML = '';
    data.forEach((item)=>{
        const row = `<tr>
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>${item.amount}</td>
        <td>${item.note || ''}</td>
        </tr>`;
         tableBody.innerHTML = row;
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const note = document.getElementById('note').value;

    const data = {
        category,
        amount,
        date,
        note
    }
    txn.push(data);
    localStorage.setItem('txn', JSON.stringify(txn));
    form.reset()
})

//Display conditions

function tableFilter(){
    let filterInput = document.getElementById("filt").value;

    if(filterInput && filterInput == 'Income'){
        const incomeData = txn.filter(x => x.category == 'Income')
        displayTable(incomeData)
        return;
    }else if(filterInput && filterInput == "Expenses"){
        const expensesData = txn.filter(x => x.category == "Expenses")
        displayTable(expensesData)
        return;
    }else if(filterInput){
       const parseTodigit =  Number(filterInput);
       const amtData = txn.filter(x => x.amount == parseTodigit)
       displayTable(amtData)
       return;
    }else{
    const msg = document.getElementById('err').innerHTML = `Please enter Income / Expenses or an amount in number`
      return;
    }

}








