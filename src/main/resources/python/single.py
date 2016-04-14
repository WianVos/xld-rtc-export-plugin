from xldrtc import repo

from java.lang import String
from java.util import Arrays
from sets import Set
from org.apache.commons.collections.list import FixedSizeList;

import simplejson as json

ci_id = request.query["ci"]
logger.info("Requesting detailed info on %s" % ci_id)
# repositoryService is one of the available XL Deploy services.
repository_helper = repo.RepositoryHelper(repositoryService)

# You can use logger object to output messages to XL Deploy log


# response.entity is what will be returned to the client as JSON
# XL Deploy can automatically serialize list of ConfigurationItem objects which will be returned
# by the helper.
#response.entity = repository_helper.get_deployables_ci_ids('Applications/test1/blah')

ci = repositoryService.read(ci_id)
response.entity = ci

