import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Star,
  Download,
  Share,
  Filter,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Watchlist, WatchlistItem } from "../PortfolioModel";
import { watchlists } from "../PortfolioData";
import WatchlistDialog from "../WatchListDialog";
import AddStockDialog from "../AddStock";
import EditStocks from "../EditStocks";

function WatchListCoverageTrackers() {
  const [localWatchlists, setLocalWatchlists] =
    useState<Watchlist[]>(watchlists);
  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(
    localWatchlists[0] || null
  );
  const [filteredStatus, setFilteredStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog states
  const [watchlistDialogOpen, setWatchlistDialogOpen] = useState(false);
  const [addStockDialogOpen, setAddStockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingWatchlist, setEditingWatchlist] = useState<
    Watchlist | undefined
  >(undefined);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [editStockDialogOpen, setEditStockDialogOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<WatchlistItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleWatchlistSelect = (watchlistId: string) => {
    const selected = localWatchlists.find((wl) => wl.id === watchlistId);
    if (selected) {
      setSelectedWatchlist(selected);
    }
  };

  // Filter items based on status and search term
  const filteredItems = selectedWatchlist
    ? selectedWatchlist.items.filter((item) => {
        const matchesStatus =
          filteredStatus === "all" || item.coverageStatus === filteredStatus;
        const matchesSearch =
          item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sector.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      })
    : [];

  const handleCreateWatchlist = () => {
    setEditingWatchlist(undefined);
    setWatchlistDialogOpen(true);
  };

  const handleEditWatchlist = () => {
    if (selectedWatchlist) {
      setEditingWatchlist(selectedWatchlist);
      setWatchlistDialogOpen(true);
    }
  };

  const handleDeleteWatchlist = () => {
    if (selectedWatchlist) {
      setLocalWatchlists((prev) =>
        prev.filter((wl) => wl.id !== selectedWatchlist.id)
      );
      setSelectedWatchlist(
        localWatchlists.length > 1 ? localWatchlists[0] : null
      );
      toast({
        title: "Watchlist deleted",
        description: `${selectedWatchlist.name} has been deleted.`,
      });
    }
  };

  const handleSaveWatchlist = (watchlist: Partial<Watchlist>) => {
    if (watchlist.id) {
      // Update existing watchlist
      setLocalWatchlists((prev) =>
        prev.map((wl) =>
          wl.id === watchlist.id
            ? {
                ...wl,
                name: watchlist.name || wl.name,
                description: watchlist.description,
                updatedAt: new Date().toISOString(),
              }
            : wl
        )
      );

      // Update selected watchlist if it's the one being edited
      if (selectedWatchlist?.id === watchlist.id) {
        setSelectedWatchlist((prev) =>
          prev
            ? {
                ...prev,
                name: watchlist.name || prev.name,
                description: watchlist.description,
                updatedAt: new Date().toISOString(),
              }
            : null
        );
      }

      toast({
        title: "Watchlist updated",
        description: `${watchlist.name} has been updated successfully.`,
      });
    } else {
      // Create new watchlist
      const newWatchlist: Watchlist = {
        id: `wl${Date.now()}`,
        name: watchlist.name || "New Watchlist",
        description: watchlist.description,
        items: [],
        createdBy: "Current User", // This would be the logged-in user in a real app
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sharedWith: [],
      };

      setLocalWatchlists((prev) => [...prev, newWatchlist]);
      setSelectedWatchlist(newWatchlist);

      toast({
        title: "Watchlist created",
        description: `${newWatchlist.name} has been created successfully.`,
      });
    }
  };

  const handleAddStock = (stock: Partial<WatchlistItem>) => {
    if (!selectedWatchlist) return;

    const newStock: WatchlistItem = {
      id: `item${Date.now()}`,
      ticker: stock.ticker || "",
      companyName: stock.companyName || "",
      sector: stock.sector || "",
      coverageStatus: stock.coverageStatus || "Watch Only",
      priority: stock.priority || false,
      notes: stock.notes || "",
      addedDate: stock.addedDate || new Date().toISOString(),
      addedBy: stock.addedBy || "Current User", // This would be the logged-in user in a real app
    };

    const updatedWatchlist = {
      ...selectedWatchlist,
      items: [...selectedWatchlist.items, newStock],
      updatedAt: new Date().toISOString(),
    };

    setLocalWatchlists((prev) =>
      prev.map((wl) => (wl.id === selectedWatchlist.id ? updatedWatchlist : wl))
    );

    setSelectedWatchlist(updatedWatchlist);

    toast({
      title: "Stock added",
      description: `${newStock.ticker} has been added to ${selectedWatchlist.name}.`,
    });
  };

  const handleDeleteStock = (itemId: string) => {
    setDeleteItemId(itemId);
    setDeleteDialogOpen(true);
  };
  const handleEditStock = (itemId: string) => {
    if (!selectedWatchlist) return;

    const stockToEdit = selectedWatchlist.items.find(
      (item) => item.id === itemId
    );
    if (stockToEdit) {
      setEditingStock(stockToEdit);
      setEditStockDialogOpen(true);
    }
  };

  const handleSaveEditedStock = (stock: Partial<WatchlistItem>) => {
    if (!selectedWatchlist || !stock.id) return;

    const updatedWatchlist = {
      ...selectedWatchlist,
      items: selectedWatchlist.items.map((item) =>
        item.id === stock.id
          ? {
              ...item,
              ticker: stock.ticker || item.ticker,
              companyName: stock.companyName || item.companyName,
              sector: stock.sector || item.sector,
              coverageStatus: stock.coverageStatus || item.coverageStatus,
              priority:
                typeof stock.priority === "boolean"
                  ? stock.priority
                  : item.priority,
              notes: stock.notes !== undefined ? stock.notes : item.notes,
            }
          : item
      ),
      updatedAt: new Date().toISOString(),
    };

    setLocalWatchlists((prev) =>
      prev.map((wl) => (wl.id === selectedWatchlist.id ? updatedWatchlist : wl))
    );

    setSelectedWatchlist(updatedWatchlist);

    toast({
      title: "Stock updated",
      description: `${stock.ticker} has been updated successfully.`,
    });
  };
  const confirmDeleteStock = () => {
    if (!selectedWatchlist || !deleteItemId) return;

    const stockToDelete = selectedWatchlist.items.find(
      (item) => item.id === deleteItemId
    );

    const updatedWatchlist = {
      ...selectedWatchlist,
      items: selectedWatchlist.items.filter((item) => item.id !== deleteItemId),
      updatedAt: new Date().toISOString(),
    };

    setLocalWatchlists((prev) =>
      prev.map((wl) => (wl.id === selectedWatchlist.id ? updatedWatchlist : wl))
    );

    setSelectedWatchlist(updatedWatchlist);
    setDeleteDialogOpen(false);
    setDeleteItemId(null);

    toast({
      title: "Stock removed",
      description: `${
        stockToDelete?.ticker || "Stock"
      } has been removed from the watchlist.`,
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export initiated",
      description: `Exporting watchlist as ${format.toUpperCase()}...`,
    });
    // Export logic would be implemented here
  };

  const handleShare = () => {
    toast({
      title: "Share watchlist",
      description: "Share settings dialog would appear here",
    });
    // Share dialog logic would be implemented here
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            value={selectedWatchlist?.id}
            onValueChange={handleWatchlistSelect}
          >
            <SelectTrigger className="w-full md:w-[250px] bg-white">
              <SelectValue placeholder="Select watchlist" />
            </SelectTrigger>
            <SelectContent>
              {localWatchlists.map((watchlist) => (
                <SelectItem key={watchlist.id} value={watchlist.id}>
                  {watchlist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="bg-white"
            onClick={handleCreateWatchlist}
          >
            <Plus size={16} className="mr-1" />
            New Watchlist
          </Button>

          {selectedWatchlist && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white"
                onClick={handleEditWatchlist}
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white text-red-500"
                onClick={handleDeleteWatchlist}
              >
                <Trash size={16} />
              </Button>
            </div>
          )}
        </div>

        {selectedWatchlist && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white"
              onClick={() => setAddStockDialogOpen(true)}
            >
              <Plus size={16} className="mr-1" />
              Add Stock
            </Button>
            <div className="flex">
              <Button
                variant="outline"
                size="sm"
                className="rounded-r-none bg-white"
                onClick={() => handleExport("csv")}
              >
                <Download size={16} className="mr-1" />
                Export
              </Button>
              <Select>
                <SelectTrigger className="w-[90px] rounded-l-none border-l-0 bg-white">
                  <SelectValue placeholder="CSV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white"
              onClick={handleShare}
            >
              <Share size={16} className="mr-1" />
              Share
            </Button>
          </div>
        )}
      </div>

      {selectedWatchlist ? (
        <Card className="border-t-8 border-violet-500 shadow-md">
          <CardHeader>
            <div className="flex flex-row items-center justify-between pb-2 bg-slate-100 p-4 rounded-md shadow-sm">
              <div>
                <CardTitle className="text-xl font-bold text-indigo-700">
                  {selectedWatchlist.name}
                </CardTitle>
                <CardDescription>
                  {selectedWatchlist.description || "No description provided"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-gray-50">
                  {selectedWatchlist.items.length} stocks
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  Updated{" "}
                  {new Date(selectedWatchlist.updatedAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-2">
                <Select
                  value={filteredStatus}
                  onValueChange={setFilteredStatus}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Under Coverage">
                      Under Coverage
                    </SelectItem>
                    <SelectItem value="Watch Only">Watch Only</SelectItem>
                    <SelectItem value="Dropped">Dropped</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon">
                  <Filter size={16} />
                </Button>
              </div>

              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by ticker, name, or sector..."
                  className="w-full md:w-[300px] bg-white pl-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border bg-white overflow-hidden">
              <Table>
                <TableHeader className="bg-finance-blue">
                  <TableRow>
                    <TableHead className="text-white">Ticker</TableHead>
                    <TableHead className="text-white">Company Name</TableHead>
                    <TableHead className="text-white">Sector</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Priority</TableHead>
                    <TableHead className="text-white">Notes</TableHead>
                    <TableHead className="text-right text-white">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    currentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.ticker}
                        </TableCell>
                        <TableCell>{item.companyName}</TableCell>
                        <TableCell>{item.sector}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.coverageStatus === "Under Coverage"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                : item.coverageStatus === "Watch Only"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {item.coverageStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.priority && (
                            <Star
                              size={16}
                              className="text-amber-500 fill-amber-500"
                            />
                          )}
                        </TableCell>
                        <TableCell
                          className="max-w-[200px] truncate"
                          title={item.notes}
                        >
                          {item.notes}
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditStock(item.id)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => handleDeleteStock(item.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No stocks found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredItems.length)} of{" "}
                  {filteredItems.length} models
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm px-2">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-t-4 border-indigo-500 shadow-md">
          <CardContent className="py-10 text-center">
            <h3 className="text-lg font-medium mb-2">No watchlist selected</h3>
            <p className="text-muted-foreground mb-4">
              Create a new watchlist to get started
            </p>
            <Button
              onClick={handleCreateWatchlist}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus size={16} className="mr-1" />
              Create New Watchlist
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <WatchlistDialog
        open={watchlistDialogOpen}
        onOpenChange={setWatchlistDialogOpen}
        watchlist={editingWatchlist}
        onSave={handleSaveWatchlist}
      />

      <AddStockDialog
        open={addStockDialogOpen}
        onOpenChange={setAddStockDialogOpen}
        onAdd={handleAddStock}
      />
      <EditStocks
        open={editStockDialogOpen}
        onOpenChange={setEditStockDialogOpen}
        onSave={handleSaveEditedStock}
        stock={editingStock}
      />
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this
              stock from the watchlist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteStock}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
export default WatchListCoverageTrackers;
