import React from 'react'
import "./ExpenseForm.css"
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className='form-center'>
            <div className='form-group'>
                {/* label에 htmlfor를 달면 이 라벨이 어디서 사용하는 라벨인지 확인하기 쉽다. */}
                <label htmlfor='charge'>지출 항목</label>
                <input className="form-control"
                    type="text" 
                    id="charge"
                    name="charge" 
                    placeholder ='예) 렌트비'
                    value = {charge}
                    onChange = {handleCharge}
                />
            </div>
            <div>
                {/* label에 htmlfor를 달면 이 라벨이 어디서 사용하는 라벨인지 확인하기 쉽다. */}
                <label htmlfor='amount'>지출 항목</label>
                <input className="form-control"
                    type="number" 
                    id="amount"
                    name="amount" 
                    placeholder ='예) 100'
                    value = {amount}
                    onChange = {handleAmount}
                />
            </div>
        </div>
        {/* 버튼의 타입의 타입이 submit이어야 위의 form의 onsubmit이벤트 리스너와 연결된다.*/}
        <button type="submit" className='btn'>{edit ? "수정" : "제출"}
            <MdSend className='btn-icon' /></button>
    </form>
  )
}

export default ExpenseForm
