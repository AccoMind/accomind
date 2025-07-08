"""add_source_column_to_chat_message

Revision ID: e649fd8388b3
Revises: 51268b5ef27c
Create Date: 2025-07-07 15:39:48.458914

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e649fd8388b3'
down_revision: Union[str, None] = '51268b5ef27c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create enum type for MessageSource
    message_source_enum = sa.Enum('user', 'bot', name='messagesource')
    
    # Add the source column to chat_message table
    op.add_column('chat_message', sa.Column('source', message_source_enum, nullable=False, server_default='user'))


def downgrade() -> None:
    # Remove the source column
    op.drop_column('chat_message', 'source')
    
    # Drop the enum type
    op.execute("DROP TYPE IF EXISTS messagesource")
