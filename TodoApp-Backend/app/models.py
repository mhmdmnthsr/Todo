from sqlalchemy import String, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base

class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
