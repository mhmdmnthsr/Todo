from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
import app.models as models, app.schemas as schemas
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/todos", response_model=schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    db_todo = models.Todo(title=todo.title)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/todos", response_model=list[schemas.TodoResponse])
def read_todos(db: Session = Depends(get_db)):
    return db.query(models.Todo).all()

@app.put("/todos/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.completed = not todo.completed
    db.commit()
    db.refresh(todo)
    return todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db.query(models.Todo).filter(models.Todo.id == todo_id).delete()
    db.commit()
    return {"message": "Todo deleted"}
