import './styles.css';

export default function ItemList({title, description}) { /* title e description vem da api*/
  return (
    <div className="itemList">
      <strong>{title}</strong>
      <p>{description}</p>
      <hr></hr>
    </div>
  )
}
