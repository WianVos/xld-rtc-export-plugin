# This script is invoked when /api/extension/test/py URL is requested

from xldrtc import repo

# repositoryService is one of the available XL Deploy services.
repository_helper = repo.RepositoryHelper(repositoryService)

# You can use logger object to output messages to XL Deploy log
logger.info("Requesting all the CIs under %s from the repository.")

# response.entity is what will be returned to the client as JSON
# XL Deploy can automatically serialize list of ConfigurationItem objects which will be returned
# by the helper.
response.entity = repository_helper.get_filtered_cis("udm.DeploymentPackage", parent="Applications")
