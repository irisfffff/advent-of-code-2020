class Node {
    constructor(data, next = null){
        this.data = data,
            this.next = next
    }
}

class LinkedList {
    constructor(){
        this.head = null
        this.tail = null
        this.nodeMap = new Map()
    }
}

LinkedList.prototype.insertAtBeginning = (data) => {
// A newNode object is created with property data and next = null
    let newNode = new Node(data)
// The pointer next is assigned head pointer so that both pointers now point at the same node.
    newNode.next = this.head
// As we are inserting at the beginning the head pointer needs to now point at the newNode.
    this.head = newNode
    return this.head
}

LinkedList.prototype.insertAtEnd = (data) => {
    // A newNode object is created with property data and next=null
    let newNode = new Node(data)
    // When head = null i.e. the list is empty, then head itself will point to the newNode.
    if(!this.head){
        this.head = newNode
        this.tail = newNode
        this.nodeMap = new Map()
        this.nodeMap.set(data, newNode)
        return [this.head, this.tail]
    }
    // Else, update the tail
    this.tail.next = newNode
    this.tail = newNode
    this.nodeMap.set(data, newNode)
    return [this.head, this.tail]
}

LinkedList.prototype.findData = (data) => {
    return this.nodeMap.get(data)
}

LinkedList.prototype.getAt = function(index){
    let counter = 0;
    let node = this.head;
    while (node) {
        if (counter === index) {
            return node;
        }
        counter++;
        node = node.next;
    }
    return null;
}

// The insertAt() function contains the steps to insert a node at a given index.
LinkedList.prototype.insertAt = function(data, index){
// if the list is empty i.e. head = null
    if (!this.head) {
        this.head = new Node(data)
        return
    }
// if new node needs to be inserted at the front of the list i.e. before the head.
    if (index === 0) {
        this.head = new Node(data, this.head)
        return
    }
// else, use getAt() to find the previous node.
    const previous = this.getAt(index - 1);
    let newNode = new Node(data);
    newNode.next = previous.next;
    previous.next = newNode;

    return this.head
}

module.exports = {
    Node: Node,
    LinkedList: LinkedList
}