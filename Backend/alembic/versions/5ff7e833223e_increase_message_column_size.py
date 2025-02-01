"""increase message column size

Revision ID: 5ff7e833223e
Revises: 2684ce8c6bf4
Create Date: 2025-01-31 21:51:27.495610

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '5ff7e833223e'
down_revision: Union[str, None] = '2684ce8c6bf4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('chat_message', 'message',
               existing_type=mysql.VARCHAR(length=500),
               type_=sa.String(length=1024),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('chat_message', 'message',
               existing_type=sa.String(length=1024),
               type_=mysql.VARCHAR(length=500),
               existing_nullable=True)
    # ### end Alembic commands ###
