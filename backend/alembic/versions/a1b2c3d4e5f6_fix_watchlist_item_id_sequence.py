"""fix watchlist_item id sequence

Revision ID: a1b2c3d4e5f6
Revises: 8f939ad9ae2f
Create Date: 2026-05-12 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a1b2c3d4e5f6"
down_revision: Union[str, Sequence[str], None] = "8f939ad9ae2f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE SEQUENCE IF NOT EXISTS watchlist_item_id_seq")
    op.execute("SELECT setval('watchlist_item_id_seq', COALESCE((SELECT MAX(id) FROM watchlist_item), 0) + 1, false)")
    op.execute("ALTER TABLE watchlist_item ALTER COLUMN id SET DEFAULT nextval('watchlist_item_id_seq')")
    op.execute("ALTER SEQUENCE watchlist_item_id_seq OWNED BY watchlist_item.id")


def downgrade() -> None:
    op.execute("""
        ALTER TABLE watchlist_item ALTER COLUMN id DROP DEFAULT;
        DROP SEQUENCE IF EXISTS watchlist_item_id_seq;
    """)
