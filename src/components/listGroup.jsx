import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { items, onItemSelect, selectedItem } = this.props;
    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            style={{ cursor: "pointer" }}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item._id}
            onClick={() => onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
