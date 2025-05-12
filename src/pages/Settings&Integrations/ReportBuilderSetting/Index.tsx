import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronDown, Copy, Edit, FileEdit, Plus, Trash, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ReportTemplate } from "../ToolsModel";
import { reportTemplates } from "../ToolSettingData";
import TemplateEditorDialog from "./TemplateEditor";

 function ReportBuilderSetting() {
  const [templates, setTemplates] = useState<ReportTemplate[]>(reportTemplates);
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setIsTemplateDialogOpen(true);
  };

  const handleEditTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setIsTemplateDialogOpen(true);
  };

  const handleCloneTemplate = (template: ReportTemplate) => {
    const cloned: ReportTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      previousVersions: [],
    };
    
    setTemplates([...templates, cloned]);
    toast({
      title: "Template Cloned",
      description: `"${template.name}" has been cloned successfully.`,
    });
  };

  const handleDeleteTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteTemplate = () => {
    if (selectedTemplate) {
      setTemplates(templates.filter(t => t.id !== selectedTemplate.id));
      setIsDeleteDialogOpen(false);
      setSelectedTemplate(null);
      toast({
        title: "Template Deleted",
        description: `"${selectedTemplate.name}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const handleSaveTemplate = (template: ReportTemplate) => {
    if (selectedTemplate) {
      // Edit existing template
      setTemplates(
        templates.map(t => t.id === template.id ? template : t)
      );
      toast({
        title: "Template Updated",
        description: `"${template.name}" has been updated.`,
      });
    } else {
      // Create new template
      setTemplates([...templates, template]);
      toast({
        title: "Template Created",
        description: `"${template.name}" has been created.`,
      });
    }
    setIsTemplateDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6 p-4 rounded-md shadow-sm" style={{background:"linear-gradient(to right, #d5e2f3, #effcec)"}}>
        <h2 className="text-xl font-bold text-finance-blue">Report Builder Settings</h2>
        <p className="text-muted-foreground">
          Customize report templates, branding options and default fields
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="fields">Default Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Template Library</h3>
            <Button onClick={handleCreateTemplate}>
              <Plus className="mr-2 h-4 w-4" /> Create Template
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-finance-blue text-white">
                  <TableRow>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Sections</TableHead>
                    <TableHead className="text-white">Last Updated</TableHead>
                    <TableHead className="text-white">Version</TableHead>
                    <TableHead className="w-[120px] text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            template.reportType === "Equity" ? "bg-blue-50 text-blue-600 border-blue-200" :
                            template.reportType === "ESG" ? "bg-green-50 text-green-600 border-green-200" :
                            template.reportType === "Macro" ? "bg-amber-50 text-amber-600 border-amber-200" :
                            "bg-purple-50 text-purple-600 border-purple-200"
                          }
                        >
                          {template.reportType}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.sections.length}</TableCell>
                      <TableCell>{new Date(template.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>v{template.version}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCloneTemplate(template)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteTemplate(template)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader className="bg-green-50 mb-3">
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Configure your organization's branding for all reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization-name">Organization Name</Label>
                    <Input 
                      id="organization-name" 
                      placeholder="Your Company Name" 
                      defaultValue="FinWise Research"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Organization Logo</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop your logo or click to browse
                      </p>
                      <Button variant="outline" className="mt-4">
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primary-color" 
                        type="color" 
                        className="w-12 h-10 p-1"
                        defaultValue="#4a6bff"
                      />
                      <Input 
                        defaultValue="#4a6bff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="secondary-color" 
                        type="color"
                        className="w-12 h-10 p-1"
                        defaultValue="#f0f6ff"
                      />
                      <Input 
                        defaultValue="#f0f6ff"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disclaimer">Default Disclaimer</Label>
                    <Textarea 
                      id="disclaimer" 
                      placeholder="Enter your disclaimer text"
                      defaultValue="This report is prepared for informational purposes only and should not be considered as investment advice. SEBI Registration No: INH000001234"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: "Branding settings saved",
                    description: "Your branding settings have been updated successfully."
                  });
                }}>
                  Save Branding Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields">
          <Card>
            <CardHeader className="bg-green-50 mb-6">
              <CardTitle>Default Fields</CardTitle>
              <CardDescription>
                Configure default fields that will be auto-populated in reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-finance-blue text-white">
                  <TableRow>
                    <TableHead className="text-white">Field Name</TableHead>
                    <TableHead className="text-white">Token</TableHead>
                    <TableHead className="text-white">Default Value</TableHead>
                    <TableHead className="w-[120px] text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Analyst Name</TableCell>
                    <TableCell><code className="bg-muted px-2 py-1 rounded">{"{analyst_name}"}</code></TableCell>
                    <TableCell>Current User</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Report Date</TableCell>
                    <TableCell><code className="bg-muted px-2 py-1 rounded">{"{current_date}"}</code></TableCell>
                    <TableCell>Today's Date</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Compliance Note</TableCell>
                    <TableCell><code className="bg-muted px-2 py-1 rounded">{"{compliance_note}"}</code></TableCell>
                    <TableCell>SEBI Registration No: INH000001234</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Company Rating Scale</TableCell>
                    <TableCell><code className="bg-muted px-2 py-1 rounded">{"{rating_scale}"}</code></TableCell>
                    <TableCell>Buy / Hold / Sell definitions</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-end">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TemplateEditorDialog
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
        template={selectedTemplate}
        onSave={handleSaveTemplate}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedTemplate?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteTemplate}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
 export default ReportBuilderSetting
