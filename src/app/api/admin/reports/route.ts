import { NextResponse } from 'next/server';
import {connect} from '@/dbConfig/dbConfig';
import Donation from '@/models/donationModel';
import BloodRequest from '@/models/requestModel';
import User from '@/models/userModel';

export async function GET() {
  await connect();

  try {
    // 1. Total Counts
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const pendingRequests = await BloodRequest.countDocuments({ status: 'pending' });

    // 2. Inventory by Blood Group (Aggregation)
    const inventory = await Donation.aggregate([
      { $group: { _id: "$bloodGroup", totalUnits: { $sum: "$units" } } }
    ]);

    // 3. Donation Trends (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const trends = await Donation.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 } 
      }},
      { $sort: { "_id": 1 } }
    ]);

    return NextResponse.json({
      stats: { totalDonors, pendingRequests },
      inventory,
      trends
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}