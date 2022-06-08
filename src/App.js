import React from 'react';
import classNames from 'classnames/bind';
// import ReactDOM from 'react-dom';

const getKey = () => Math.random().toString(32).substring(2);
/*
key: String, // key：タスクを一意に特定するID
text: String,
done: Boolean
*/


function Todo() {
  //stateの初期値にテストデータを入れる
  const [items, setItems] = React.useState([]);
  // filteringのstateの追加 ALL/TODO/DONEの3つに分類
  const [filter, setFilter] = React.useState('ALL');


  
  // ... items means add
  const handleAdd = text => {
    setItems([...items, {key: getKey(), text, done: false}]); 
  };
  
  const handleFilterChange = value => setFilter(value);
  

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleCheck = checked => {
    const newItems = items.map(item => {
      if (item.key === checked.key){
        item.done = !item.done; // doneの真偽反転
      }
      return item;
    });
    setItems(newItems);
  };


  //stateをmapにてループで表示するJSXコード
  // ループで生成される要素にはkeyが必要→タスクに用意したkeyプロパティを利用する
  // onCheck　propsに指定
  return (
    <div className="panel">
      <div className="panel-heading">
      ⚛️ React ToDo
      </div>
      <Input onAdd={handleAdd} />
      <Filter
        onChange={handleFilterChange}
        value={filter} 
      />
      {displayItems.map(item =>(
        <TodoItem 
        key={item.text} 
        item={item} 
        onCheck={handleCheck} 
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
    </div>
  );
}


//タスクの部分を切り出す
//チェックされた(もしくは外された)時に、ハンドラ関数[onCheck]を実行
// -> 子から親にチェックされたことを知らせる
function TodoItem({ item, onCheck }) {
  // handleChangeの初期設定→clickされたらitemを見る
  const handleChange = () => {
    onCheck(item);
  };

  return (
    <label className="panel-block">
      <input 
      type="checkbox" 
      checked={item.done} 
      onChange={handleChange}
      />
      {item.text}
    </label>
  );
}

// タスクの作成機能
function Input({ onAdd }){
  const [text, setText] = React.useState('');

  const handleChange = e => setText(e.target.value);

  // エンターキーを押した時のハンドラの実装
  const handleKeyDown = e => {
      if (e.key === 'Enter') {
        onAdd(text);
        setText('');
      }
  };

  return (
    <div className="panel-block">
      <input
        className="input"
        type="text"
        placeholder="Enter to add"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}


function Filter({ value, onChange }) {
  const handleClick = (key, e) => {
    console.log({e})
    e.preventDefalut(); //clickの制御
    onChange(key);
  };

  // ハンドラに引数を渡す→bind
  //classnamesを使用
  return (
    <div className="panel-tabs">
      <a
        href='#'
        onClick={handleClick.bind(null, 'ALL')}
        className={classNames({ 'is-active': value === 'ALL'})}
      >ALL</a>
      <a
        href='#'
        onClick={handleClick.bind(null, 'TODO')}
        className={classNames({ 'is-active': value === 'TODO'})}
      >ToDo</a>
      <a
      href='#'
      onClick={handleClick.bind(null, 'DONE')}
      className={classNames({ 'is-active': value === 'DONE'})}
      >Done</a>
    </div>
  );
}

function App() {
  return (
    <div className="container is-fluid">
      <Todo />
    </div>
  );
}


export default App;
