import React from 'react'
import ExpenseItem from './ExpenseItem'
import "./ExpenseList.css"

// 인자를 받기위해서 props를 매개변수로 가져야한다.
const ExpenseList = ({handleEdit, expenses, handleDelete, clearList}) => {
    // props의 이름을 통해 가져온다.
  return (
    // jsx에선 반드시 부모요소가 존재해야하기 때문에 신경 써줘야한다.
    <>
        <ul className='list'>
            {/* expense Item 컴포넌트를 채워넣는다.*/}
            {/* expenses의 값을 순회해야한다. =>     map을 사용한다. */}
            {
              expenses && expenses.map(expense => {
                // 리엑트는 가상돔을 이용해서 바뀐 부분을 돔에 업데이트한다.
                // 가상돔 2개를 비교할 때 key가 있어야 비교하는데 도움을 줄 수 있다.
                return <ExpenseItem 
                          handleDelete = {handleDelete}
                          key={expense.id}
                          expense={expense}
                          handleEdit = {handleEdit} 
                        />
              })
            }
        </ul>
        <button className='btn' onClick={()=>clearList()}>
            목록 지우기
        </button>
    </>
  )
}

export default ExpenseList
