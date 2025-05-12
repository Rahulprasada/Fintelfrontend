import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  CheckSquare, 
  Archive, 
  Download, 
  Filter,
  Search,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { comments, researchSubmissions } from "../PortfolioData";
import { Comment } from "../PortfolioModel";

 function CommentFeedBackCenter() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState("");
  
  // Filter comments by status and search term
  const filteredComments = comments.filter(comment => {
    const matchesStatus = statusFilter === "all" || comment.status.toLowerCase() === statusFilter.toLowerCase();
    const submission = researchSubmissions.find(sub => sub.id === comment.documentId);
    
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (submission?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      comment.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const handleExportComments = () => {
    toast({
      title: "Exporting comments",
      description: "Comments export initiated",
    });
    // Export logic would be implemented here
  };
  
  const handleSubmitReply = () => {
    if (!replyText.trim() || !selectedComment) return;
    
    toast({
      title: "Reply submitted",
      description: "Your reply has been added to the comment thread",
    });
    setReplyText("");
    // Reply submission logic would be implemented here
  };
  
  const handleResolveComment = (comment: Comment) => {
    toast({
      title: "Comment resolved",
      description: "Comment has been marked as resolved",
    });
    // Resolve comment logic would be implemented here
  };
  
  const handleReopenComment = (comment: Comment) => {
    toast({
      title: "Comment reopened",
      description: "Comment has been reopened",
    });
    // Reopen comment logic would be implemented here
  };
  
  const handleArchiveComment = (comment: Comment) => {
    toast({
      title: "Comment archived",
      description: "Comment has been archived",
    });
    // Archive comment logic would be implemented here
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case 'resolved':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'archived':
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  
  // Get document title for a comment
  const getDocumentTitle = (documentId: string) => {
    const submission = researchSubmissions.find(sub => sub.id === documentId);
    return submission?.title || "Unknown Document";
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-amber-700">Comments & Feedback</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search comments, documents, or authors..."
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Comments</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="bg-white"
            onClick={handleExportComments}
          >
            <Download size={16} className="mr-2" /> Export Comments
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/2 border-t-8 border-amber-500 shadow-md">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 pb-2">
            <CardTitle className="text-lg text-amber-800">Comment Threads</CardTitle>
            <CardDescription>
              {filteredComments.length} comment{filteredComments.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedComment?.id === comment.id ? 'bg-amber-50' : ''}`}
                    onClick={() => setSelectedComment(comment)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-amber-200 text-amber-800">
                            {comment.createdBy.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comment.createdBy}</p>
                          <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(comment.status)}>
                        {comment.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm line-clamp-2">{comment.content}</p>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {getDocumentTitle(comment.documentId)}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <MessageSquare size={14} className="mr-1" />
                        {comment.replies.length} replies
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No comments found matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full lg:w-1/2 border-t-8 border-yellow-500 shadow-md">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 pb-2">
            <CardTitle className="text-lg text-yellow-800 flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Comment Details
            </CardTitle>
            <CardDescription>
              {selectedComment ? (
                `${selectedComment.section ? `Section: ${selectedComment.section}` : 'General comment'}`
              ) : (
                'Select a comment to view details'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {selectedComment ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-amber-200 text-amber-800">
                          {selectedComment.createdBy.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedComment.createdBy}</p>
                        <p className="text-xs text-gray-500">{formatDate(selectedComment.createdAt)}</p>
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(selectedComment.status)}>
                      {selectedComment.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-3">{selectedComment.content}</p>
                  
                  <div className="text-xs text-gray-500">
                    Document: {getDocumentTitle(selectedComment.documentId)}
                    {selectedComment.section && <span> • Section: {selectedComment.section}</span>}
                  </div>
                </div>
                
                <div className="space-y-3 pl-6 border-l-2 border-gray-100">
                  {selectedComment.replies.map((reply) => (
                    <div key={reply.id} className="p-3 border rounded-md bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-gray-200 text-gray-800 text-xs">
                            {reply.createdBy.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{reply.createdBy}</p>
                          <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                        </div>
                      </div>
                      <p className="text-sm">{reply.content}</p>
                    </div>
                  ))}
                  
                  {selectedComment.status === 'Open' && (
                    <div className="pt-2">
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[80px] bg-white"
                      />
                      <div className="flex justify-end mt-2">
                        <Button 
                          size="sm" 
                          onClick={handleSubmitReply}
                          disabled={!replyText.trim()}
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  {selectedComment.status === 'Open' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => handleResolveComment(selectedComment)}
                    >
                      <CheckCircle size={14} className="mr-1" /> Resolve
                    </Button>
                  )}
                  
                  {selectedComment.status === 'Resolved' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-500"
                      onClick={() => handleReopenComment(selectedComment)}
                    >
                      <RefreshCw size={14} className="mr-1" /> Reopen
                    </Button>
                  )}
                  
                  {selectedComment.status !== 'Archived' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-gray-600 border-gray-200 hover:bg-gray-500"
                      onClick={() => handleArchiveComment(selectedComment)}
                    >
                      <Archive size={14} className="mr-1" /> Archive
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Select a comment to view details and replies
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CommentFeedBackCenter;