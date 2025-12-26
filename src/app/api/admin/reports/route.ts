// import { NextResponse } from 'next/server';
// import {connect} from '@/dbConfig/dbConfig';
// import Donation from '@/models/donationModel';
// import BloodRequest from '@/models/requestModel';
// import User from '@/models/userModel';

// export async function GET() {
//   await connect();

//   try {
//     // 1. Total Counts
//     const totalDonors = await User.countDocuments({ role: 'donor' });
//     const pendingRequests = await BloodRequest.countDocuments({ status: 'Pending' });

//     // 2. Inventory by Blood Group (Aggregation)
//     const inventory = await Donation.aggregate([
//       { $group: { _id: "$bloodGroup", totalUnits: { $sum: "$units" } } }
//     ]);

//     // 3. Donation Trends (Last 7 Days)
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
//     const trends = await Donation.aggregate([
//       { $match: { createdAt: { $gte: sevenDaysAgo } } },
//       { $group: { 
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           count: { $sum: 1 } 
//       }},
//       { $sort: { "_id": 1 } }
//     ]);

//     return NextResponse.json({
//       stats: { totalDonors, pendingRequests },
//       inventory,
//       trends
//     });
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
//   }
// }






import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Donation from '@/models/donationModel';
import BloodRequest from '@/models/requestModel';
import User from '@/models/userModel';

export async function GET() {
  await connect();

  try {
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const pendingRequests = await BloodRequest.countDocuments({ status: 'Pending' });

    // 1. Inventory Aggregation
    // Ensure "bloodGroup" matches your Donation model exactly!
    const inventory = await Donation.aggregate([
      { $group: { _id: "$bloodGroup", totalUnits: { $sum: "$units" } } },
      { $sort: { _id: 1 } } // Sort A, B, AB, O alphabetically
    ]);

    // 2. Trend Aggregation (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0); // Start from the beginning of the day
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const trends = await Donation.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 } 
      }},
      { $sort: { "_id": 1 } }
    ]);

    // 3. Debugging (Check your terminal)
    console.log("Inventory Found:", inventory.length);
    console.log("Trends Found:", trends.length);

    return NextResponse.json({
      stats: { totalDonors, pendingRequests },
      // Fallback: If inventory is empty, return an empty array so map() doesn't fail
      inventory: inventory || [], 
      trends: trends || []
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}