export interface IAddTodo {
  completed: boolean,
  id: number,
  title: string
  }

export interface IEditTodo {
  id: number,
  title: string,
  completed: boolean
}

export interface ITodo {
  id: number,
  title: string,
  completed: boolean
}
