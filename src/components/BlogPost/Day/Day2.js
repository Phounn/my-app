import React, { useState, useEffect } from "react";
import BlogPost from "../BlogPost/BlogPost";
import ProductComp from "../ProductComp/ProductComp";

const FunctionalCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `func updateb ${count}`
  })
  return (
    <div className="counter">
      <h2>This is class counter</h2>
      <p>Amount: {count}</p>
      <button className="add-btn"
      onClick={() => {
        setCount(count + 1);
      }}>Add</button>
      <button className="sub-btn" onClick={() => setCount(count - 1)}>Sub</button>
    </div>
  );
};


class ClassCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       count: 0,
    }
  }
  componentDidUpdate (){
    document.title = `amount ${this.state.count}`
  }
  increaseNum(){
    this.setState({
      count: this.state.count + 1,
    })
  }
  decreaseNum(){
    this.setState({
      count: this.state.count - 1,
    })
  }
  
  render() {
    return (
      <div className="counter">
        <h2>This is class counter</h2>
        <p>Amount: {this.state.count}</p>
        <button className="add-btn" onClick={() => this.increaseNum()}>Add</button>
        <button className="sub-btn" onClick={() => {
          this.setState({
            count: this.state.count - 1,
          })
        }}>Sub</button>
      </div>
    );
  }
}

//Main Component
const Day2 = () => {
  const productImg = 'https://imgs.search.brave.com/6qqce2iW4ccd35xSwBvr9YGGu7HQ0jO-Mxxy-Prw_Kk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFBODViMWtpVEwu/anBn'
  const title = "Gaming T-shirt"
  const price = "$500"
  const productDetail = [
    {
      productImg: 'https://imgs.search.brave.com/6qqce2iW4ccd35xSwBvr9YGGu7HQ0jO-Mxxy-Prw_Kk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFBODViMWtpVEwu/anBn',
      title: "Gaming T-shirt",
      price: "$500"
    },
    {
      productImg: 'https://imgs.search.brave.com/SLOfYg62stap8ZeL7APvxhkD19kpiHKIUMaiXAqKTsk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYWR5/d2hpdGVjby5jb20v/Y2RuL3Nob3AvZmls/ZXMvTFcxMDFTLU9V/Ui1ULVNISVJULVNF/RE9OQS0xLmpwZz92/PTE3MjE2NzcwMjAm/d2lkdGg9MjAwMA',
      title: "Chanel T-shirt",
      price: "$200"
    },
  ]
  return (
    <div className="app">
      <h1></h1>
      <FunctionalCounter/>
      <ClassCounter />
      <hr/>
      <BlogPost person = "Mixue"/>
      <hr/>
      {/* <ProductComp title = {title} productImg = {productImg} price = {price}/> */}
      {productDetail.map((element, index) => (
        <ProductComp title = {element.title} productImg = {element.productImg} price = {element.price}/>
      ))}

      <style jsx>
        {
          `.app{
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          .counter{
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          }
          button{
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin: 10px;
          }
          .add-btn{
            background-color: #4caf50;
          }
          .sub-btn{
            background-color: red;
          
          }
          .product-card{
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          }
          `
        }
      </style>
    </div>
  );
}



export default Day2;