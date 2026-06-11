from .chat import router as chat_router
from .analytics import router as analytics_router
from .network import router as network_router
from .forecast import router as forecast_router
from .auth import router as auth_router
from .criminals import router as criminals_router
from .cases import router as cases_router
from .firs import router as firs_router
from .reports import router as reports_router

__all__ = ["chat_router", "analytics_router", "network_router", "forecast_router", "auth_router", "criminals_router", "cases_router", "firs_router", "reports_router"]
