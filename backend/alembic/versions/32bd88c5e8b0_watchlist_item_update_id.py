"""watchlist_item_update_id

Revision ID: 32bd88c5e8b0
Revises: 2ce8c6a09c51
Create Date: 2026-04-07 12:29:38.484940

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '32bd88c5e8b0'
down_revision: Union[str, Sequence[str], None] = '2ce8c6a09c51'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint('watchlist_item_pkey', 'watchlist_item', type_='primary')
    op.drop_column('watchlist_item', 'id')
    op.add_column('watchlist_item', sa.Column('id', sa.Integer(), autoincrement=True, nullable=False))
    op.create_primary_key('watchlist_item_pkey', 'watchlist_item', ['id'])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('watchlist_item_pkey', 'watchlist_item', type_='primary')
    op.drop_column('watchlist_item', 'id')
    op.add_column('watchlist_item', sa.Column('id', sa.UUID(), nullable=False))
    op.create_primary_key('watchlist_item_pkey', 'watchlist_item', ['id'])
