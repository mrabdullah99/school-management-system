import React, { useState } from 'react';
import { Search, Plus, Download, Eye, Receipt, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { dummyStudents, dummyFeeStructure } from '../data/dummyData';

interface FeeRecord {
  id: string;
  studentId: string;
  month: string;
  year: number;
  amount: number;
  paidAmount: number;
  status: 'paid' | 'partial' | 'pending';
  dueDate: string;
  paidDate?: string;
}

const dummyFeeRecords: FeeRecord[] = [
  {
    id: '1',
    studentId: '1',
    month: 'December',
    year: 2024,
    amount: 21000,
    paidAmount: 21000,
    status: 'paid',
    dueDate: '2024-12-05',
    paidDate: '2024-12-01'
  },
  {
    id: '2',
    studentId: '2',
    month: 'December',
    year: 2024,
    amount: 20000,
    paidAmount: 0,
    status: 'pending',
    dueDate: '2024-12-05'
  },
  {
    id: '3',
    studentId: '3',
    month: 'December',
    year: 2024,
    amount: 21000,
    paidAmount: 0,
    status: 'pending',
    dueDate: '2024-11-05'
  }
];

export const Fees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);

  const filteredRecords = dummyFeeRecords.filter(record => {
    const student = dummyStudents.find(s => s.id === record.studentId);
    return student && 
           student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (selectedStatus === '' || record.status === selectedStatus);
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'pending': return 'danger';
      default: return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  const getOverallStats = () => {
    const totalDue = dummyFeeRecords.reduce((sum, record) => sum + record.amount, 0);
    const totalPaid = dummyFeeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
    const pending = dummyFeeRecords.filter(record => record.status === 'pending').length;
    const overdue = dummyFeeRecords.filter(record => 
      record.status === 'pending' && new Date(record.dueDate) < new Date()
    ).length;

    return { totalDue, totalPaid, pending, overdue };
  };

  const stats = getOverallStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600">Manage student fees and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsPaymentModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Collect Payment
          </Button>
        </div>
      </div>

      {/* Fee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Due</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalDue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Collected</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalPaid)}</p>
            </div>
            <Receipt className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: '', label: 'All Status' },
                { value: 'paid', label: 'Paid' },
                { value: 'partial', label: 'Partial' },
                { value: 'pending', label: 'Pending' }
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Fee Records Table */}
      <Card padding="none">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Student</TableHeader>
              <TableHeader>Month/Year</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Paid</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Due Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => {
              const student = dummyStudents.find(s => s.id === record.studentId);
              const isOverdue = record.status === 'pending' && new Date(record.dueDate) < new Date();
              
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={student?.photo}
                        alt={student?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{student?.name}</p>
                        <p className="text-sm text-gray-500">{student?.class} - {student?.section}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{record.month}</p>
                    <p className="text-sm text-gray-500">{record.year}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{formatCurrency(record.amount)}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{formatCurrency(record.paidAmount)}</p>
                    {record.amount > record.paidAmount && (
                      <p className="text-sm text-red-600">
                        Balance: {formatCurrency(record.amount - record.paidAmount)}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)}>
                      {record.status}
                      {isOverdue && ' (Overdue)'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {new Date(record.dueDate).toLocaleDateString()}
                    </p>
                    {record.paidDate && (
                      <p className="text-xs text-green-600">
                        Paid: {new Date(record.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {record.status === 'paid' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRecord(record);
                            setIsReceiptModalOpen(true);
                          }}
                        >
                          <Receipt className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedRecord(record);
                            setIsPaymentModalOpen(true);
                          }}
                        >
                          Pay
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Collect Fee Payment"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-blue-900">
                    {dummyStudents.find(s => s.id === selectedRecord.studentId)?.name}
                  </h4>
                  <p className="text-blue-700">
                    {selectedRecord.month} {selectedRecord.year} Fee
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-900 font-semibold">
                    Amount: {formatCurrency(selectedRecord.amount)}
                  </p>
                  <p className="text-blue-700">
                    Balance: {formatCurrency(selectedRecord.amount - selectedRecord.paidAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Payment Amount"
                type="number"
                defaultValue={selectedRecord.amount - selectedRecord.paidAmount}
              />
              <Input
                label="Payment Date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              <Select
                label="Payment Method"
                options={[
                  { value: 'cash', label: 'Cash' },
                  { value: 'bank', label: 'Bank Transfer' },
                  { value: 'cheque', label: 'Cheque' },
                  { value: 'online', label: 'Online Payment' }
                ]}
              />
              <Input label="Transaction ID/Reference" />
              <div className="md:col-span-2">
                <Input label="Remarks (Optional)" />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                Collect Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Fee Receipt"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            {/* Receipt Header */}
            <div className="text-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">School Management System</h2>
              <p className="text-gray-600">Fee Payment Receipt</p>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p><span className="font-medium">Receipt No:</span> #RCP-{selectedRecord.id}</p>
                <p><span className="font-medium">Student:</span> {dummyStudents.find(s => s.id === selectedRecord.studentId)?.name}</p>
                <p><span className="font-medium">Class:</span> {dummyStudents.find(s => s.id === selectedRecord.studentId)?.class}</p>
                <p><span className="font-medium">Roll No:</span> {dummyStudents.find(s => s.id === selectedRecord.studentId)?.rollNumber}</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium">Date:</span> {selectedRecord.paidDate && new Date(selectedRecord.paidDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Month/Year:</span> {selectedRecord.month} {selectedRecord.year}</p>
                <p><span className="font-medium">Amount Paid:</span> {formatCurrency(selectedRecord.paidAmount)}</p>
                <p><span className="font-medium">Status:</span> 
                  <Badge variant="success" className="ml-2">Paid</Badge>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Fee Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Tuition Fee</span>
                  <span>₹15,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport Fee</span>
                  <span>₹3,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Exam Fee</span>
                  <span>₹2,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Miscellaneous</span>
                  <span>₹1,000</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(selectedRecord.paidAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsReceiptModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};