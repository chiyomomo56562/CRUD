import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from "./components/Alert";
import { useState } from 'react';

function App() {

  const [expenses, setExpenses] = useState(
    [
      {id: 1, charge: "렌트비", amount:1000},
      {id: 2, charge: "교통비", amount:2000},
      {id: 3, charge: "식비", amount:3000},
    ]
  )

  // form에서 사용해줄 변수들
  // setState이기 때문에 함수 지정을 안하면 text box내부의 값이 변하지 않는다.
  const [charge,  setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    // e.target.value는 Int가 아닌 String 값이다.
    setAmount(e.target.valueAsNumber)
  }

  const handleSubmit = (e) => {
    // 원래 그냥 제출 버튼만 누르면 새로고침이 된다. 이걸 막는 것
    e.preventDefault();
    if(charge !=="" && amount >0) {
      // charge와 amount 모두 유효한 값일 때만 실행된다.
      if(edit === false) {
        const newExpense = {
          id: crypto.randomUUID(),
          charge, amount
        }
      
        // ...을 이용하면 얕은 복사를 한다.
        setExpenses([...expenses, newExpense])

        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }else{
        const newExpenses = expenses.map(item => {
          // ...item은 기존 item의 값을 복사 하는 것
          // 그 뒤에 charge와 amount를 추가하는 것
          return item.id === id ? {...item, charge, amount} : item
        })
        console.log(newExpenses)
        setExpenses(newExpenses)
        setEdit(false)

        handleAlert({ type: 'success', text: "아이템이 수정되었습니다." });
        }
      // 다시 박스를 비워준다.
      setCharge("");
      setAmount(0);
    }
  }
  

  // // 이 데이터는 ExponentItem에서 필요하다.
  // // =>props를 사용해서 내려준다..
  // const initialExpenses=[
  //   {id: 1, charge: "렌트비", amount:1000},
  //   {id: 2, charge: "교통비", amount:2000},
  //   {id: 3, charge: "식비", amount:3000},
  // ]
  // 변수를 스테이트로 대체했다

const handleDelete = (id) => {
  // id를 이용해서 initialExpenses에서 id가 일치하는 expense를 filter()로 제거
  const newExpenses = expenses.filter(expense => expense.id !== id)
  // 이렇게 새로운 배열을 받았는데 이걸 화면에 랜더링 시켜줘야한다. => state를 이용하자.
  // state가 변경되면 컴포넌트는 렌더링이 새로 된다.
  // state는 새로고침되면 초기화 된다.
  setExpenses(newExpenses)

  handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' })
}

// 수정 버튼을 눌렀을 때 여러가지 변화가 필요하다.
// 1. charge와 amount를 form으로 복사해준다.
// 2. 제출 버튼을 수정버튼으로 변경한다.  
const [edit, setEdit] = useState(false);
const [id, setId] = useState(0);

const handleEdit = (id) => {
  const expense = expenses.find(item => item.id === id)
  const {charge, amount} = expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
}

const clearList = () => {
  setExpenses([])
  handleAlert({ type: 'danger', text: '아이템이 모두 삭제되었습니다.' })
}

const [alert, setAlert] = useState({ show: false });
const handleAlert = ({ type, text }) => {
  setAlert({ show: true, type, text });
  setTimeout(() => {
    setAlert({ show: false });
  }, 7000);
}
  return (
    <main className='main-container'>
      {/* 이 App.js 파일 내부에서 index.html에 들어갈 내용을 만드는 것 */}
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      {/* 1. 무언가 작성하는 인풋 부분이 필요함 */}
      <div style={{ width: '100%', backgroundColor:'white', padding:'1rem'}}>
        <ExpenseForm 
          charge = {charge}
          amount = {amount}
          handleCharge = {handleCharge}
          handleAmount = {handleAmount}
          handleSubmit = {handleSubmit}
          edit = {edit}
        />
      </div>

      {/* 2. 작성한 리스트를 출력할 부분이 필요함 */}
      {/* 3. 작성한 리스트들은 cell형태로 존재 */}
      <div style={{ width: '100%', backgroundColor:'white', padding:'1rem'}}>
        <ExpenseList 
          handleDelete={handleDelete} 
          expenses = {expenses}
          handleEdit = {handleEdit}
          clearList = {clearList}
        />
      </div>
      
      <div style={{display: 'flex', justifyContent:'end', marginTop:'1rem'}}>
        <p style={{ fontSize: '2rem' }}>
          총지출:
          <span>
            {/* 위에서 나온 금액들을 모두 더해줘야한다 => reduce사용 */}
            {/* acc는 누산기, curr은 현재 순회하는 변수다. 두번째 매개변수는 acc의 초기값 */}
            {expenses.reduce((acc, curr) => {
            return (acc += curr.amount)
          }, 0)}원</span>
        </p>
      </div>
      
    </main>
  );
}

export default App;
