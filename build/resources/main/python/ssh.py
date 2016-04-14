# This script is invoked when /api/extension/test/ssh URL is requested

#import overthere py for SSH handling
#import helper class for XML filtering
import jarray
import java
import pprint
from overtherepy import SshConnectionOptions, OverthereHost, OverthereHostSession
from xldrtc import help
from rtc.RTCWorkspace import RTCWorkspace

rtc_client = repositoryService.read(request.query["client"])
rtc_repo   = repositoryService.read(request.query["repo"])

sshOpts = SshConnectionOptions(rtc_client.getProperty("host"),username = rtc_client.getProperty("username"), password = rtc_client.getProperty("password"))
host = OverthereHost(sshOpts)
session =  OverthereHostSession(host)
workspace = RTCWorkspace.createRTCWorkspace(rtc_repo,rtc_client)
loc = "/var/tmp/"

#Step one: change to a new directory to place configs
#TODO: Decide whether script makes directory or directory is there ahead of time
stepone = session.execute("cd " + loc, check_success=True)

#Retrieve key value of exported DAR
keyval = request.query["ciid"]


addkey = "curl -o " + loc + keyval + ".dar " + "http://admin:admin@localhost:4516/deployit/internal/download/" + keyval

#Step three: Execute cURL command to download DAR based on key to new directory
stepthree = session.execute(addkey, check_success=True)

getxml = "unzip " + loc + keyval + ".dar -d " + loc + keyval

#Step four: Unzip the DAR
stepfour = session.execute(getxml, check_success=True)

#SEnd the unzipped xml over to be filtered by helper class XmlFilter
exporter = help.XmlFilter(session, loc)
readmf = exporter.read_manifest(keyval)
print "hmm" 
xml_list = exporter.get_xml_list(readmf)

#Write the filtered config to a valid rtc repo 
print xml_list

#rtc_config_loc = loc + keyval + "/config.xml"
#rtc_config = open(rtc_config_loc, "w")
#rtc_config.writelines(writemf)
#rtc_config.close()






session.close_conn()
