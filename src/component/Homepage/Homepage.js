import React, { useEffect, useState } from 'react'
import { PiArchiveThin } from "react-icons/pi";
// import { Link } from 'react-router-dom'
import CallList from '../CallList/CallList';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Homepage.css'

const call_list = [
  { 'type': 0, 'phone_number': '+33 3218302838', 'description': 'tried to call on Xavier', 'time': '07:51', 'time_type': 'PM' },
  { 'type': 1, 'phone_number': '+32 1288383838', 'description': 'tried to call on Xavier', 'time': '07:52', 'time_type': 'PM' },
  { 'type': 1, 'phone_number': '+33 4838382238', 'description': 'tried to call on Xavier', 'time': '07:53', 'time_type': 'PM' },
  { 'type': 1, 'phone_number': '+33 7002021069', 'description': 'tried to call on Xavier', 'time': '07:54', 'time_type': 'PM' },
  { 'type': 1, 'phone_number': '+33 6457696610', 'description': 'tried to call on Xavier', 'time': '07:55', 'time_type': 'PM' },
  { 'type': 1, 'phone_number': '+33 3297620778', 'description': 'tried to call on Xavier', 'time': '07:56', 'time_type': 'PM' },
  { 'type': 1, 'phone_number': '+33 8790699318', 'description': 'tried to call on Xavier', 'time': '07:57', 'time_type': 'PM' },
  { 'type': 0, 'phone_number': '+33 5288383838', 'description': 'tried to call on Xavier', 'time': '07:58', 'time_type': 'PM' }
]
// let n= Math.ceil(Math.random()*20);
// const call_list=new Array(n);

// for(let i=0;i<n;i++){
//   const type=Math.round(Math.abs(Math.sin(Math.random()*10)));
//   const obj={ 'type': type, 'phone_number': call_list_standard[i%8], 'description': 'tried to call on Xavier', 'time': String(new Date().getHours())+':'+String(new Date().getMinutes())+':'+String(new Date().getMilliseconds()), 'time_type': type?'PM':'AM' };
//   console.log()
//   call_list[i]=obj
// }


class AVLNode {
  constructor(key, data) {
    this.key = key; // Unique value
    this.data = data; // Data associated with the key
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Helper function to get the height of a node
  getHeight(node) {
    return node ? node.height : 0;
  }

  is_tree_empty() {
    return this.root === null ? true : false
  }

  // Helper function to update the height of a node based on its children
  updateHeight(node) {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  // Helper function to get the balance factor of a node
  getBalanceFactor(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Helper function for left rotation
  leftRotate(y) {
    const x = y.right;
    const T2 = x.left;

    // Perform rotation
    x.left = y;
    y.right = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  // Helper function for right rotation
  rightRotate(x) {
    const y = x.left;
    const T2 = y.right;

    // Perform rotation
    y.right = x;
    x.left = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // Helper function to balance the tree after insertion or deletion
  balance(node) {
    if (!node) return null;

    // Update height of the current node
    this.updateHeight(node);

    // Get the balance factor
    const balanceFactor = this.getBalanceFactor(node);

    // Left-Left Case
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // Left-Right Case
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right-Right Case
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // Right-Left Case
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  // Public method to insert a key and data into the AVL tree
  insert(key, data) {
    this.root = this._insert(this.root, key, data);
  }

  // Private recursive method for insertion
  _insert(root, key, data) {
    // Perform standard BST insert
    if (!root) {
      return new AVLNode(key, data);
    }

    if (key < root.key) {
      root.left = this._insert(root.left, key, data);
    } else if (key > root.key) {
      root.right = this._insert(root.right, key, data);
    } else {
      // Duplicate keys are not allowed
      return root;
    }

    // Update height of the current node
    this.updateHeight(root);

    // Balance the tree
    return this.balance(root);
  }

  // Public method to remove a key from the AVL tree
  remove(key) {
    const result = this._remove(this.root, key);
    this.root = result.root;
    return result.deletedNode;
  }

  // Private recursive method for removal
  _remove(root, key) {
    // Perform standard BST delete
    if (!root) {
      return { root: null, deletedNode: null };
    }

    let deletedNode = null;

    if (key < root.key) {
      const result = this._remove(root.left, key);
      root.left = result.root;
      deletedNode = result.deletedNode;
    } else if (key > root.key) {
      const result = this._remove(root.right, key);
      root.right = result.root;
      deletedNode = result.deletedNode;
    } else {
      // Node with only one child or no child
      if (!root.left || !root.right) {
        deletedNode = { ...root }; // Create a copy of the deleted node
        const temp = root.left || root.right || null;
        root = null;
        return { root, deletedNode };
      }

      // Node with two children, get the in-order successor (smallest
      // in the right subtree) and replace it with the current node
      const successor = this.getMinValueNode(root.right);
      deletedNode = { ...root }; // Create a copy of the deleted node
      root.key = successor.key;
      root.data = successor.data;
      const result = this._remove(root.right, successor.key);
      root.right = result.root;
      deletedNode = result.deletedNode;
    }

    // If the tree had only one node, return
    if (!root) {
      return { root, deletedNode };
    }

    // Update height of the current node
    this.updateHeight(root);

    // Balance the tree
    return { root: this.balance(root), deletedNode };
  }
  // Helper function to find the node with the smallest key value
  getMinValueNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  // Public method to perform an in-order traversal of the AVL tree
  inOrderTraversal(callback) {
    this._inOrderTraversal(this.root, callback);
  }

  // Private recursive method for in-order traversal
  _inOrderTraversal(node, callback) {
    if (node) {
      this._inOrderTraversal(node.left, callback);
      callback({ key: node.key, data: node.data });
      this._inOrderTraversal(node.right, callback);
    }
  }
}

// Example usage:
let unArchived = new AVLTree();
let Archived = new AVLTree();

for (let i of call_list) {
  unArchived.insert(i.time, i);
}

function Homepage() {
  const [archive, setArchive] = useState(0)
  const [archive_type, setArchive_type] = useState(0)

  function archiveAll(val) {
    if (val === 0) {
      if (Archived.is_tree_empty()) {
        let temp = unArchived
        unArchived = Archived
        Archived = temp
        return
      }

      Archived.inOrderTraversal((node) => unArchived.insert(node.data.time, node.data))
      Archived.root = null
      return
    }
    else {
      if (unArchived.is_tree_empty()) {
        let temp = unArchived
        unArchived = Archived
        Archived = temp
        return
      }

      unArchived.inOrderTraversal((node) => Archived.insert(node.data.time, node.data))
      unArchived.root = null
      return
    }
  }
  var archived_empty = Archived.is_tree_empty()
  var unarchived_empty = unArchived.is_tree_empty()
  
  return (
    <div className='homepage'>
      <div className='homepage-navbar'>
        <Navbar setArchive_type={setArchive_type} />
      </div>

      {archive_type === 0 ?
        unarchived_empty === false?
          <div className='archive'>
            <button onClick={() => { setArchive(archive ^ 1); archiveAll(1); }}><PiArchiveThin size='20px' /><p>Archive all calls</p></button>
          </div> :
          <div className='archive'>
            <p style={{ textAlign: 'center', color: 'red' }}>No Calls Found in Activity</p>
          </div>
        :
        archived_empty===false ?
          <div className='archive'>
            <button onClick={() => { setArchive(archive ^ 1); archiveAll(0); }}><PiArchiveThin size='20px' /><p>UnArchive all calls</p></button>
          </div> :
          <div className='archive'>
            <p style={{ textAlign: 'center', color: 'red' }}>Archive is Empty</p>
          </div>
      }
      {
        <div className='call-list'>
          <CallList Archived={Archived} unArchived={unArchived} archive_type={archive_type} />
        </div>
      }
      <div className='footer1'>
        <Footer />
      </div>
    </div>
  )
}

export default Homepage