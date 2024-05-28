#include<bits/stdc++.h>
using namespace std;
void solve()
{
  vector<vector<int>>v(2);
  int n,m;
  cin>>n>>m;
  string s1,s2;
  cin>>s1>>s2;
  for(int i=0;i<m;i++)
  {
    v[s2[i]-'0'].push_back(i);
  }
  // for(auto it:v[0])
  // {
  //   cout<<it<<" ";
  // }
  // cout<<endl;
  // for(auto it:v[1])
  // {
  //   cout<<it<<" ";
  // }
  // cout<<"\n";
  int index=-1,ct=0;
  for(int i=0;i<n;i++)
  {
    auto it=upper_bound(v[s1[i]-'0'].begin(),v[s1[i]-'0'].end(),index);
    if(it==v[s1[i]-'0'].end())
    {
      break;
    }else{
      index=*it;
    }
    ct++;
  }
  cout<<ct<<"\n";

}
int main()
{
  int t=1;
  while(t--)
  {
    solve();
  }
  return 0;
}