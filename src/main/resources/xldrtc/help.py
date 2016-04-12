import xml.etree.ElementTree as ET

class XmlFilter:

    def __init__(self, session, workingDirectory):
        self._workingDirectory = workingDirectory
        self._session = session

    # Read the manifest xml
    def read_manifest(self, appKey):
        file_name = "%s/%s/deployit-manifest.xml" % (self._workingDirectory, appKey)
        return self._session.read_file(file_name, encoding="UTF-8")

    # Filter out unwanted files or types
    # TODO: Make this user defined, not hard coded.
    #def find_value(self, value):
    #    filterarray = ["was.ear", "was.jar", "jee.DataSourceSpec"]
    #    for elem in filterarray:
    #        if elem == value:
    #            return False
    #        else:
    #            return True
#
#    # Change xml to ElementTree for easier filtering and return updated XML
   # def mod_manifest(self, readmf):
   #     root = ET.fromstring(readmf)
   #     for child in root:
   #         if child.tag == "deployables":
   #             for gchild in child:
   #                 if self.find_value(gchild.tag):
   #                     child.remove(gchild)
#
#        updatedXml = ET.tostring(root,encoding="us-ascii")
#        return updatedXml
#    
    # Change xml to ElementTree for easier filtering and return updated XML
    def get_xml_list(self, readmf):
        print "in filter"  
        filterarray = ["was.ear", "was.jar", "jee.DataSourceSpec"]
        root = ET.fromstring(readmf)
        xml_list = ET.fromstring("<list></list>")
        
        for child in root:
         if child.tag == "deployables":
                for gchild in child:
                    if gchild.tag not in filterarray:
                       xml_list.append(gchild)
        
        updatedXml = ET.tostring(xml_list,encoding="us-ascii")
        print updatedXml
        return updatedXml
