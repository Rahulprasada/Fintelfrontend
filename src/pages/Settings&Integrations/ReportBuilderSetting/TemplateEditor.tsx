import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Edit, Grip, Plus, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReportTemplate, ReportType, TemplateSection } from "../ToolsModel";

interface TemplateEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: ReportTemplate | null;
  onSave: (template: ReportTemplate) => void;
}

export default function TemplateEditorDialog({ 
  open, 
  onOpenChange, 
  template, 
  onSave 
}: TemplateEditorDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState<ReportType>("Equity");
  const [sections, setSections] = useState<TemplateSection[]>([]);
  const [isEditingSectionId, setIsEditingSectionId] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [isSectionRequired, setIsSectionRequired] = useState(true);

  useEffect(() => {
    if (template) {
      setName(template.name);
      setDescription(template.description);
      setReportType(template.reportType);
      setSections([...template.sections]);
    } else {
      setName("");
      setDescription("");
      setReportType("Equity");
      setSections([]);
    }
  }, [template]);

  const handleSave = () => {
    const updatedTemplate: ReportTemplate = {
      id: template?.id || `template-${Date.now()}`,
      name,
      description,
      createdBy: template?.createdBy || "Current User",
      createdAt: template?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reportType,
      sections,
      defaultFields: template?.defaultFields || [],
      branding: template?.branding || {
        primaryColor: "#4a6bff",
        footerText: "© 2024 FinWise Research. All Rights Reserved.",
        disclaimerText: "SEBI Registration No: INH000001234",
        headerOptions: {
          showLogo: true,
          showTitle: true,
          showDate: true
        }
      },
      version: template?.version ? template.version + 1 : 1,
      previousVersions: template?.previousVersions 
        ? [...template.previousVersions, { version: template.version, updatedAt: template.updatedAt }] 
        : []
    };
    
    onSave(updatedTemplate);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setReportType("Equity");
    setSections([]);
    setIsEditingSectionId(null);
    setSectionTitle("");
    setSectionDescription("");
    setIsSectionRequired(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = [...sections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order property
    const updatedSections = items.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      order: sections.length + 1,
      required: true
    };
    
    setSections([...sections, newSection]);
    setIsEditingSectionId(newSection.id);
    setSectionTitle(newSection.title);
    setSectionDescription("");
    setIsSectionRequired(true);
  };

  const handleEditSection = (section: TemplateSection) => {
    setIsEditingSectionId(section.id);
    setSectionTitle(section.title);
    setSectionDescription(section.description || "");
    setIsSectionRequired(section.required);
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
    if (isEditingSectionId === sectionId) {
      setIsEditingSectionId(null);
    }
  };

  const handleSaveSection = () => {
    if (!isEditingSectionId) return;
    
    setSections(sections.map(section => 
      section.id === isEditingSectionId 
        ? {
            ...section,
            title: sectionTitle,
            description: sectionDescription || undefined,
            required: isSectionRequired
          }
        : section
    ));
    
    setIsEditingSectionId(null);
    setSectionTitle("");
    setSectionDescription("");
    setIsSectionRequired(true);
  };

  const handleCancelEditSection = () => {
    setIsEditingSectionId(null);
    setSectionTitle("");
    setSectionDescription("");
    setIsSectionRequired(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[70vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle>{template ? "Edit" : "Create"} Report Template</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Standard Equity Research Report"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the purpose of this template"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <Select 
              value={reportType} 
              onValueChange={(value: ReportType) => setReportType(value)}
            >
              <SelectTrigger id="reportType">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Equity">Equity</SelectItem>
                <SelectItem value="ESG">ESG</SelectItem>
                <SelectItem value="Macro">Macro</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator className="my-2" />
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Template Sections</h3>
              <Button variant="outline" size="sm" onClick={handleAddSection}>
                <Plus className="mr-2 h-4 w-4" /> Add Section
              </Button>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {sections.map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border p-3 rounded-md ${
                              isEditingSectionId === section.id ? "border-primary" : ""
                            }`}
                          >
                            {isEditingSectionId === section.id ? (
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
                                  <Input 
                                    id={`section-title-${section.id}`}
                                    value={sectionTitle}
                                    onChange={(e) => setSectionTitle(e.target.value)}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor={`section-description-${section.id}`}>Description (Optional)</Label>
                                  <Textarea 
                                    id={`section-description-${section.id}`}
                                    value={sectionDescription}
                                    onChange={(e) => setSectionDescription(e.target.value)}
                                    rows={2}
                                  />
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id={`section-required-${section.id}`}
                                    checked={isSectionRequired}
                                    onCheckedChange={setIsSectionRequired}
                                  />
                                  <Label htmlFor={`section-required-${section.id}`}>Required Section</Label>
                                </div>
                                
                                <div className="flex justify-end gap-2 pt-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleCancelEditSection}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    onClick={handleSaveSection}
                                  >
                                    Save Section
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                    <Grip className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  
                                  <div>
                                    <div className="font-medium">{section.title}</div>
                                    {section.description && (
                                      <div className="text-sm text-muted-foreground">
                                        {section.description}
                                      </div>
                                    )}
                                    {section.required && (
                                      <div className="inline-flex items-center mt-1 text-xs text-muted-foreground border px-1 py-0.5 rounded-sm">
                                        Required
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleEditSection(section)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteSection(section.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            
            {sections.length === 0 && (
              <div className="border border-dashed rounded-md p-6 text-center">
                <p className="text-muted-foreground">
                  No sections added yet. Click "Add Section" to create your first section.
                </p>
              </div>
            )}
          </div>
          
          {template && (
            <>
              <Separator className="my-2" />
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="version-history">
                  <AccordionTrigger>Version History</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 px-2 bg-muted rounded">
                        <span className="text-sm font-medium">Current Version: v{template.version}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(template.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {template.previousVersions?.map((version) => (
                        <div key={version.version} className="flex justify-between py-1 px-2">
                          <span className="text-sm">v{version.version}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(version.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name.trim() || sections.length === 0}>
            {template ? "Update Template" : "Create Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
