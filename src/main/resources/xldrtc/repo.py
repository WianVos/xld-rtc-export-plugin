# Query all of the requested CIs.  In this case, we only want
# deployment packages under Applications.
from com.xebialabs.deployit.plugin.api.reflect import Type

class RepositoryHelper:

    def __init__(self, repositoryService):
        self._repositoryService = repositoryService

    def get_all_cis(self, parent):
        ci_ids = self._repositoryService.query(None, None, "Applications", None, None, None, 0, -1)
        return map(lambda ci_id: self._repositoryService.read(ci_id.id), ci_ids)

    def get_filtered_cis(self, type, parent=None):
        type_ci = Type.valueOf(type)
        ci_ids = self._repositoryService.query(type_ci, None, parent, None, None, None, 0, -1)
        return map(lambda ci_id: self._repositoryService.read(ci_id.id), ci_ids)
